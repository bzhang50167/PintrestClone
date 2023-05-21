from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Post, db
from app.forms import PostForm, EditPostForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_all_posts():
    posts = Post.query.all()
    post_list = [post.to_dict() for post in posts]
    return jsonify(post_list)

@post_routes.route('/<int:id>')
def get_post_by_id(id):
    post = Post.query.get(id)
    return jsonify(post.to_dict())

@post_routes.route('/new', methods=['POST'])
@login_required
def create_post():
    print('in the route ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data,'+++++++++++++++++++++++++++++++++')
    if form.validate_on_submit():
        print('GOT PASS VALIDATIONS <=========================')
        post_picture = form.data['image_url']
        post_picture.filename = get_unique_filename(post_picture.filename)
        upload = upload_file_to_s3(post_picture)

        if 'url' not in upload:
            return upload['errors']

        post_pic = upload['url']

        new_post = Post(
            user_id = form.data['user_id'],
            text = form.data['text'],
            image_url = post_pic
        )

        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.to_dict())
    else:
        return 'Bad Data'


@post_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_post(id):
    print('in the route +++++++++++++++++++++++++++')
    post = Post.query.get(id)
    form = EditPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('=====================>', form.data)
    if form.validate_on_submit():
        post.text = form.data['text']
        post.title = form.data['title']
        print(post.text, '<=====================')
        db.session.commit()
        return jsonify(post.to_dict())
    else:
        return 'Bad Data'

@post_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)

    if not post:
        return 'Post does not exits'
    else:
        db.session.delete(post)
        db.session.commit()

        if not 1 <= post.id <= 30:
            remove_file_from_s3(post.image_url)

        return jsonify({
            'message': 'Post Deleted Successfully'
        })
