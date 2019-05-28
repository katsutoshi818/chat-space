class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    respond_to do |format|
      format.html
      format.json{@messages = group.messages.includes(:user).where(['id > ? and group_id = ?',params[:id], params[:group_id]] )}
    end
  end
end