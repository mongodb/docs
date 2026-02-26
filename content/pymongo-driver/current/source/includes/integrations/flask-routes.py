from flask import render_template, url_for, flash, \
                  redirect, request
from app import app, mongo
from bson.objectid import ObjectId
from app.models import Post
from app.forms import PostForm

@app.route("/")
@app.route("/home")
def home():
    posts_data = mongo.db.posts.find()
    posts = [Post.from_dict(post) for post in posts_data]
    return render_template("index.html", posts=posts)


@app.route("/post/new", methods=["GET", "POST"])
def new_post():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(title=form.title.data, 
                   content=form.content.data)
        mongo.db.posts.insert_one(post.to_dict())
        flash("Your post has been created!", "success")
        return redirect(url_for("home"))
    return render_template("post.html", title="New Post", 
                         form=form)


@app.route("/post/<post_id>")
def post(post_id):
    post_data = mongo.db.posts.find_one_or_404(
        {"_id": ObjectId(post_id)})
    post = Post.from_dict(post_data)
    return render_template("detail.html", post=post)


@app.route("/post/<post_id>/edit", methods=["GET", "POST"])
def edit_post(post_id):
    post_data = mongo.db.posts.find_one_or_404(
        {"_id": ObjectId(post_id)})
    post = Post.from_dict(post_data)
    form = PostForm()
    if form.validate_on_submit():
        updated_post = {
            "$set": {"title": form.title.data, 
                    "content": form.content.data}
        }
        mongo.db.posts.update_one(
            {"_id": ObjectId(post_id)}, updated_post)
        flash("Your post has been updated!", "success")
        return redirect(url_for("post", post_id=post_id))
    elif request.method == "GET":
        form.title.data = post.title
        form.content.data = post.content
    return render_template("edit_post.html", 
                         title="Edit Post", form=form)


@app.route("/post/<post_id>/delete", methods=["POST"])
def delete_post(post_id):
    mongo.db.posts.delete_one({"_id": ObjectId(post_id)})
    flash("Your post has been deleted!", "success")
    return redirect(url_for("home"))


@app.route("/search", methods=["GET", "POST"])
def search():
    query = request.args.get("query")
    posts_data = mongo.db.posts.find(
        {
            "$or": [
                {"title": {"$regex": query, 
                          "$options": "i"}},
                {"content": {"$regex": query, 
                            "$options": "i"}},
            ]
        }
    )
    posts = [Post.from_dict(post) for post in posts_data]
    return render_template("index.html", posts=posts)
