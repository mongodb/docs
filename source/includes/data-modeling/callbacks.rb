# start-doc-callback
class Contact
  include Mongoid::Document
  
  field :name, type: String
  field :phone, type: String
  
  # Creates a callback to clean phone numbers before saving
  before_save :process_phone
  
  protected
    def process_phone
      self.phone = phone.gsub(/[^0-9]/, "") if attribute_present?("phone")
    end

  # Creates a callback to send a message about object deletion
  after_destroy do
      p "deleted the contact for #{name}"
  end
end
# end-doc-callback

# start-doc-ops
Contact.create(name: 'Serena Atherton', phone: '999 555-3030')
# => `phone` field saved as '9995553030'
Contact.create(name: 'Zayba Haq', phone: '999  123?5050')
# => `phone` field saved as '9991235050'

Contact.first.destroy
# => Console message: "deleted the contact for Serena Atherton"
# end-doc-ops

# start-doc-set-syntax
class Contact
  include Mongoid::Document
  
  field :name, type: String
  field :phone, type: String
  field :aliases, type: Array, default: []

  set_callback(:update, :before) do |document|
    if document.name_changed?
      document.push(aliases: document.name_was)
    end
  end
end

Contact.create(name: 'Xavier Bloom', phone: '4447779999')
Contact.first.update(name: 'Xav - coworker')
# Saved document in MongoDB:
# {"aliases":["Xavier Bloom"],"name":"Xav - coworker","phone":"4447779999"}
# end-doc-set-syntax

# start-association-callback
class User
  include Mongoid::Document

  field :username, type: String
  # Registers the callback in the association statement
  embeds_many :saved_articles, before_add: :send_message

  protected
    # Passes the association document as a parameter to the callback
    def send_message(saved_article)
      if saved_articles.count >= 10
        p "you can't save more than 10 articles at a time"
        throw(:abort)
      end
    end
end

class SavedArticle
  include Mongoid::Document
  embedded_in :user

  field :url, type: String
end
# end-association-callback