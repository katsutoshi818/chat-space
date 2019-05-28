class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)

    # respond_to do |format|
    #   # binding.pry
    #   format.html
    #   format.json{@messages = Message.where(['id > ? and group_id = ?',params[:id], params[:group_id]] )}
    # end
  end

  def create
    @message = @group.messages.new(message_params)
    @message.save

    respond_to do |format|
      format.html { redirect_to group_messages_path(@group) }
      format.json
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end