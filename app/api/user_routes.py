from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms import EditUserForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    user = User.query.get(id)
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data,'+++++++++++++++++++++++++++++++++')
    if form.validate_on_submit():
        if form.data['profile_pic']:
            user_pic = form.data['profile_pic']
            user_pic.filename = get_unique_filename(user_pic.filename)
            upload = upload_file_to_s3(user_pic)

            if 'url' not in upload:
                return upload['errors']

            profile_pic = upload['url']
            user.profile_pic = profile_pic
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']

        db.session.commit()

        return jsonify(user.to_dict())

    else:
        return 'Bad Data'

@user_routes.route('/<int:user1id>/follow/<int:user2id>', methods=['PUT'])
@login_required
def follow_user(user1id, user2id):
    user1 = User.query.get(user1id)
    user2 = User.query.get(user2id)

    user1.following.append(user2)

    db.session.commit()

    return jsonify({'message': 'User followed successfully'})

@user_routes.route('/<int:user1id>/unfollow/<int:user2id>', methods=['PUT'])
@login_required
def unfollow_user(user1id, user2id):
    user1 = User.query.get(user1id)
    user2 = User.query.get(user2id)

    user1.following.remove(user2)

    db.session.commit()

    return jsonify({'message': 'User unfollowed successfully'})
