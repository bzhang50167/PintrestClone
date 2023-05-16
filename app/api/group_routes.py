from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Group, db
from app.forms import GroupForm

group_routes = Blueprint('groups', __name__)

@group_routes.route('/')
def get_all_group():
    groups = Group.query.all()
    group_list = [group.to_dict() for group in groups]
    return jsonify(group_list)

@group_routes.route('/<int:id>')
def get_group_by_id(id):
    group = Group.query.get(id)
    return jsonify(group.to_dict())

@group_routes.route('/new', methods=['POST'])
@login_required
def create_group():
    form = GroupForm
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_group = Group(
            name = form.data['name'],
            post_id = form.data['post_id'],
            user_id = form.data['user_id']
        )

        db.session.add(new_group)
        db.session.commit()

        return jsonify(new_group)

    else:
        return 'Bad Data'

@group_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_group(id):
    group = Group.query.get(id)
    form = GroupForm()
    if form.validate_on_submit():
        group.name = form.data['name']

        db.session.commit()

        return jsonify(group)

    else:
        return 'Bad Data'

@group_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_group(id):
    group = Group.query.get(id)

    if not group:
        return 'Group does not exist'

    else:
        db.session.delete(group)
        db.session.commit()

        return jsonify({
            'message':'Group Deleted Successfully'
        })

