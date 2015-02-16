class CartsController < ApplicationController
  before_action :logged_in_user

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
    @medium = Medium.find(session[:cart]) unless session[:cart].nil?
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
    @creditcard = Creditcard.new(creditcard_params)

    webpay = WebPay.new(Settings.secrets.webpay)
    webpay.set_accept_language('ja')

    begin
      webpay_response = webpay.charge.create(
        amount: @medium.price,
        currency: @medium.currency.iso_code,
        card: creditcard_params,
        description: "Memento: #{@medium.title}" # optional
      )
      current_user.update(webpay_id: webpay_response.id)

      ticket = current_user.tickets.find_by(medium_id: @medium.id)
      ticket.activate
      redirect_to complete_cart_path

    rescue WebPay::ErrorResponse::ErrorResponseError => e
      case e.data.error.caused_by
      when 'buyer'
        # カードエラーなど、購入者に原因がある
        # エラーメッセージをそのまま表示するのがわかりやすい
        flash.now[:danger] = e.data.error.message
      when 'insufficient'
        # 実装ミスに起因する
        flash.now[:danger] = e.data.error.message
      when 'missing'
        # リクエスト対象のオブジェクトが存在しない
        flash.now[:danger] = e.data.error.message
      when 'service'
        # WebPayに起因するエラー
        flash.now[:danger] = e.data.error.message
      else
        # 未知のエラー
        flash.now[:danger] = e.data.error.message
      end
      render :new
    rescue WebPay::ApiError => e
      # APIからのレスポンスが受け取れない場合。接続エラーなど
      logger.error "API request is not completed: #{e.inspect}"
      flash.now[:danger] = "API request is not completed: #{e.inspect}"
      render :new
    rescue
      # WebPayとは関係ない例外の場合
      logger.error e.inspect
      flash.now[:danger] = e.inspect
      render :new
    end
  end

  def complete
    session.delete(:cart)
  end

  private
    # Strong parameters that prevent mass assignment
    def creditcard_params
      params.require(:creditcard).permit(:name, :number, :exp_month, :exp_year, :cvc)
    end
end
