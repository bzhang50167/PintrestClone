from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, db
from app.forms import CommentForm, EditCommentForm
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
    print(form.data, '<===============================')
    if form.validate_on_submit():
        new_comment = Comment(
            post_id = form.data['post_id'],
            user_id = form.data['user_id'],
            text = form.data['text'],
        )
        db.session.add(new_comment)
        db.session.commit()
        print(new_comment, '<==============================')
        return jsonify(new_comment.to_dict())
    else:
        return 'Bad Data'

@comment_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_comment(id):
    print('IN THE ROUTES <=====================')
    comment = Comment.query.get(id)
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data, '<=========================')
    if form.validate_on_submit():
        print('PASSED VALIDATION <=====================')
        comment.text = form.data['text']
        print(comment.text, '~~~~~~~~~~~~~~~')
        db.session.commit()
        return jsonify(comment.to_dict())
    else:
        return 'Bad Data'

@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
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
