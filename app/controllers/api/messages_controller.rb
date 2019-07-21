class Api::MessagesController < ApplicationController
  def index
    
    #binding.pry
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user).where('id > ?', params[:id])
    respond_to do |format|
      format.html
      format.json  #{ render json: @messages }
    end
  
  end

end
