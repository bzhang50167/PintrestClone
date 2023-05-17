from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class EditPostForm(FlaskForm):
    text = StringField('Text')
    title = StringField('Title')
