from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileAllowed, FileRequired, FileField
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class PostForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    text = StringField('Text')
    image_url = FileField('Image Url', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
