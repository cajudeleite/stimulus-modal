class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:modal]

  def modal
    respond_to do |format|
      format.json do
        render json: {
          modal: render_to_string(
            partial: 'pages/default',
            formats: :html,
            locals: {
              title: params[:title],
              content: params[:content],
              callback_text: params[:callbackText],
              callback_path: params[:callbackPath],
              color: params[:color]
            }
          )
        }
      end
    end
  end
end
