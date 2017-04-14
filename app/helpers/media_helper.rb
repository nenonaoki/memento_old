module MediaHelper

  def media_check(attribute, medium)
    if logged_in?
      current_ticket = current_user.tickets.find_by(medium_id: medium.id)
      current_ticket && current_ticket.send(attribute)
    else
      false
    end
  end
end
