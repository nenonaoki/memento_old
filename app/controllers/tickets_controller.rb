class TicketsController < ApplicationController
  def checkin
    @ticket = Ticket.find_by(medium_id: ticket_params[:medium_id])
    if @ticket.serial_code == ticket_params[:serial_code]
      @ticket.checkin ticket_params[:user_id]
      flash[:danger] = 'Ticket checked in!'
    else
      flash[:danger] = 'Invalid serial code'
    end
    redirect_to medium_path(ticket_params[:medium_id])
  end

  private
    # Strong parameters that prevent mass assignment
    def ticket_params
      params.require(:ticket).permit(:serial_code, :user_id, :medium_id)
    end
end
