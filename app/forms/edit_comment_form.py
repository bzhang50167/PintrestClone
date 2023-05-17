from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class EditCommentForm(FlaskForm):
    text = StringField('Text', validators=[DataRequired()])
