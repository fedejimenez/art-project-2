class Post < ApplicationRecord
  self.per_page = ENV.fetch('PER_PAGE').to_i
end
