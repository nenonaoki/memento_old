class CartsController < ApplicationController
  def add
    # session[:cart] ||= []
    # session[:cart] << params[:medium_id]
    session[:cart] = params[:medium_id]
    redirect_to cart_path
  end

  def remove
    session.delete(:cart)
  end

  def new
    @medium = Medium.find(session[:cart])
    @creditcard = Creditcard.new
  end

  def confirm
    @medium = Medium.find(session[:cart])
    @creditcard = Creditcard.new(creditcard_params)
    if @creditcard.valid?
      render :confirm
    else
      render :new
    end
  end

  def create
    @medium = Medium.find(session[:cart])
    require 'webpay'
    @creditcard = Creditcard.new(creditcard_params)

    begin
      webpay = WebPay.new(Settings.secrets.webpay)
      webpay_response = webpay.charge.create(
        amount: 400,
        currency: "jpy",
        card: creditcard_params
        # description: "" # optional
      )
      redirect_to complete_cart_path

    rescue WebPay::ErrorResponse::ErrorResponseError => e
      case e.data.error.caused_by
      when 'buyer'
        # カードエラーなど、購入者に原因がある
        # エラーメッセージをそのまま表示するのがわかりやすい
      when 'insufficient'
        # 実装ミスに起因する
      when 'missing'
        # リクエスト対象のオブジェクトが存在しない
      when 'service'
        # WebPayに起因するエラー
      else
        # 未知のエラー
      end
      render :new

    rescue WebPay::ApiError => e
      # APIからのレスポンスが受け取れない場合。接続エラーなど
      render :new
    rescue
      # WebPayとは関係ない例外の場合
      render :new
    end

  end

  def complete
  end

  private
    # Strong parameters that prevent mass assignment
    def creditcard_params
      params.require(:creditcard).permit(:name, :number, :exp_month, :exp_year, :cvc)
    end
end
