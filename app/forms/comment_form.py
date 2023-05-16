from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    post_id =IntegerField('post Id', validators=[DataRequired()])
    user_id =IntegerField('user Id', validators=[DataRequired()])
    text = StringField('text', validators=[DataRequired()])
