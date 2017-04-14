module ApplicationHelper

  # Render React Component
  def render_react_component(data = {}, prerender = false)

    account = {}
    notification = []

    if logged_in?
      account = JSON.parse(
        ApplicationController.new.render_to_string(
          template: 'api/sessions/create.json.jbuilder',
            locals: { :@user => current_user }
        )
      )
    end

    flash.each do |message_type, message|
      notification << {
        timestamp: Time.now.to_i, # unixtimestamp from 1970
        type: message_type,
        message: message
      }
    end

    props = data.merge({
      path: request.path,
      account: account,
      csrf: {
        param: request_forgery_protection_token,
        token: form_authenticity_token,
      },
      notification: notification
    })

    react_component('Root', props, { prerender: prerender })
  end

  # Returns the full title on a per-page basis.
 def full_title(page_title = '')
   base_title = "Memento"
   if page_title.empty?
     base_title
   else
     page_title + " | " + base_title
   end
 end

end
