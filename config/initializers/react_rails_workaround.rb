# console_replay puts a <script> tag inside the <div data-react-class>...</div>,
# which causes React to warn that it tried to reuse some HTML but failed.
# So, capture the output of the `react_component` call, then find that <script> tag
# and move it _outside_ the <div data-react-class>...</div>. That way,
# React can successfully reuse the HTML.
class React::Rails::ComponentMount
  alias_method :old_react_component, :react_component
  def react_component(component_name, props = {}, options = {}, &block)
    prerender_output = old_react_component(component_name, props, options, &block)
    prerender_output
      .gsub("\n","")
      .gsub(/(<script>.*<\/script>)<\/div>$/,'</div>\1').html_safe
  end
end
