from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed,FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class EditUserForm(FlaskForm):
    first_name = StringField('first name', validators=[DataRequired()])
    last_name = StringField('last name', validators=[DataRequired()])
    profile_pic = FileField('profile pic', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
