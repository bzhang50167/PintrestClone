from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Group, db, Post
from app.forms import GroupForm, AddImageForm

group_routes = Blueprint('groups', __name__)

@group_routes.route('/')
def get_all_group():
    groups = Group.query.all()
    group_list = [group.to_dict() for group in groups]
    print(group_list, '<============================')
    return jsonify(group_list)

@group_routes.route('/<int:id>')
def get_group_by_id(id):
    group = Group.query.get(id)
    return jsonify(group.to_dict())

@group_routes.route('/new', methods=['POST'])
@login_required
def create_group():
    print('IN THE ROUTE <===================')
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, '<================================')
    if form.validate_on_submit():
        print('PASSED VALIATIONS <=====================')
        new_group = Group(
            name = form.data['name'],
            user_id = form.data['user_id']
        )

        db.session.add(new_group)
        db.session.commit()

        return jsonify(new_group.to_dict())

    else:
        return 'Bad Data'

@group_routes.route('/add', methods=['PUT'])
@login_required
def add_image():
    form = AddImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        group = Group.query.get(form.data['group_id'])
        post = Post.query.get(form.data['post_id'])

        group.group_posts.append(post)

        db.session.commit()
        return jsonify(group.to_dict())

@group_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_group(id):
    group = Group.query.get(id)
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data,'+++++++++++++++++++++++++++++++++++')
    if form.validate_on_submit():
        group.name = form.data['name']

        db.session.commit()

        return jsonify(group.to_dict())

    else:
        return 'Bad Data'

@group_routes.route('/<int:group_id>/delete/<int:post_id>', methods=['DELETE'])
@login_required
def remove_post_in_board(group_id,post_id):
    print('=======================>', group_id)
    print('=======================>', post_id)
    group = Group.query.get(group_id)
    print(group.to_dict(),'<==========================')
    group.group_posts = [posts for posts in group.group_posts if posts.id != post_id]
    db.session.commit()

    return jsonify(group.to_dict())

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
