from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, db
from app.forms import CommentForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def get_all_comments():
    comments = Comment.query.all()
    comment_list = [comment.to_dict() for comment in comments]
    return jsonify(comment_list)

@comment_routes.route('/<int:id>')
def get_comment_by_id(id):
    comment = Comment.query.get(id)
    return jsonify(comment.to_dict())

@comment_routes.route('/new', methods=['POST'])
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            post_id = form.data['post_id'],
            user_id = form.data['user_id'],
            text = form.data['text'],
            rating = form.data['rating']
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment)
    else:
        return 'Bad Data'

@comment_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_comment(id):
    comment = Comment.query.get(id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.post_id = form.data['post_id'],
        comment.user_id = form.data['user_id'],
        comment.text = form.data['text'],
        comment.rating = form.data['rating']
        db.session.commit()
        return jsonify(comment)
    else:
        return 'Bad Data'

@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)

    if not comment:
        return 'Comment Does Not Exist'
    else:
        db.session.delete(comment)
        db.session.commit()

        return jsonify({
            'message': 'Comment Deleted Successfully'
        })
