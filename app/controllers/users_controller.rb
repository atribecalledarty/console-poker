require 'pry'

class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: :create

    def index
        users = User.all
        render json: users
    end

    def create
        puts 'hello'
        user = User.new(user_params)
        if user.save
            render json: { user: user }, status: 201
        else 
            render json: { errors: user.errors }, status: 400
        end
        
        # binding.pry
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email)
    end
end
