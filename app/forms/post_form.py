from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    text = StringField('Text')
    image_url = StringField('Image Url', validators=[DataRequired()])
