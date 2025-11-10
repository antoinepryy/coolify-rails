# Simple production Dockerfile
FROM ruby:3.4.2-slim

# Install system dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    curl \
    git \
    sqlite3 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set working directory
WORKDIR /rails

# Copy gemfiles
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy application code
COPY . .

# Create directories and set permissions
RUN mkdir -p storage tmp log && \
    chmod -R 755 .

# Set environment
ENV RAILS_ENV=production

# Expose port
EXPOSE 3000

# Start server
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
