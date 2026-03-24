class Parent
  include Mongoid::Document
  has_many :children
  after_save { children.each(&:parent_changed_callback) }
end

class Child
  include Mongoid::Document
  belongs_to :parent

  def parent_changed_callback
    # ...
  end
end