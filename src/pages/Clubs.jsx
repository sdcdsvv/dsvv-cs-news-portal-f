import React from 'react'
import { Link } from 'react-router-dom'

const Clubs = () => {
  const clubs = [
    {
      name: 'Disha Club',
      slug: 'disha-club',
      description: 'Psychological, Spiritual & Career Counselling Club',
      icon: '🧠',
      color: 'bg-purple-500',
      activities: ['Career Counseling', 'Mental Health Workshops', 'Spiritual Sessions', 'Personality Development'],
      members: '150+'
    },
    {
      name: 'Aarogyam Club',
      slug: 'aarogyam-club',
      description: 'Health, Sport & Wellness Club',
      icon: '🏥',
      color: 'bg-green-500',
      activities: ['Yoga Sessions', 'Sports Events', 'Health Checkups', 'Nutrition Guidance'],
      members: '120+'
    },
    {
      name: 'Soorma Club',
      slug: 'soorma-club',
      description: 'Rejuvenation & Recreation Club',
      icon: '⚡',
      color: 'bg-yellow-500',
      activities: ['Adventure Sports', 'Recreation Activities', 'Team Building', 'Outdoor Events'],
      members: '100+'
    },
    {
      name: 'Sambhavna Club',
      slug: 'sambhavna-club',
      description: 'Language, Writing, Communication & Publication Club',
      icon: '📝',
      color: 'bg-blue-500',
      activities: ['Debate Competitions', 'Creative Writing', 'Public Speaking', 'Newsletter Publication'],
      members: '130+'
    },
    {
      name: 'Jigyasa Club',
      slug: 'jigyasa-club',
      description: 'Inquisitive, Research & Development Club',
      icon: '🔍',
      color: 'bg-indigo-500',
      activities: ['Research Workshops', 'Project Development', 'Paper Publications', 'Innovation Challenges'],
      members: '90+'
    },
    {
      name: 'Kriti Club',
      slug: 'kriti-club',
      description: 'Creative Club',
      icon: '🎨',
      color: 'bg-pink-500',
      activities: ['Art Workshops', 'Creative Competitions', 'Design Thinking', 'Cultural Events'],
      members: '110+'
    },
    {
      name: 'Sanskriti Club',
      slug: 'sanskriti-club',
      description: 'Cultural Club',
      icon: '🎭',
      color: 'bg-red-500',
      activities: ['Cultural Festivals', 'Music & Dance', 'Traditional Arts', 'Heritage Events'],
      members: '140+'
    },
    {
      name: 'Udyam Club',
      slug: 'udyam-club',
      description: 'Innovation & Entrepreneurship Club',
      icon: '💡',
      color: 'bg-orange-500',
      activities: ['Startup Workshops', 'Business Plan Competitions', 'Innovation Challenges', 'Entrepreneur Talks'],
      members: '80+'
    },
    {
      name: 'Rakshak Club',
      slug: 'rakshak-club',
      description: 'Safety, Security & Disaster Management Club',
      icon: '🛡️',
      color: 'bg-gray-500',
      activities: ['Safety Workshops', 'Disaster Drills', 'First Aid Training', 'Cyber Security'],
      members: '70+'
    },
    {
      name: 'Srijan Shilpi',
      slug: 'srijan-shilpi',
      description: 'Social Outreach Club',
      icon: '🤝',
      color: 'bg-teal-500',
      activities: ['Community Service', 'Social Awareness', 'NGO Partnerships', 'Rural Development'],
      members: '95+'
    },
    {
      name: 'Seva Club',
      slug: 'seva-club',
      description: 'Service & Volunteers Club',
      icon: '❤️',
      color: 'bg-rose-500',
      activities: ['Volunteer Drives', 'Social Service', 'Campus Events', 'Charity Work'],
      members: '160+'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="news-headline text-4xl font-bold text-gray-900 mb-4">
            Student Clubs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the vibrant ecosystem of 11 specialized clubs at DSVV Computer Science Department. 
            Each club offers unique opportunities for growth, learning, and community engagement.
          </p>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club) => (
            <div key={club.slug} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className={`${club.color} h-2`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{club.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{club.name}</h3>
                      <p className="text-sm text-gray-600">{club.description}</p>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                    {club.members} members
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Activities:</h4>
                  <div className="flex flex-wrap gap-1">
                    {club.activities.map((activity, index) => (
                      <span 
                        key={index}
                        className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/club/${club.slug}`}
                    className="flex-1 bg-primary-red text-white text-center py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    View Activities
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join a Club?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Club registrations are open throughout the year. Visit the CS Department office or contact 
            club coordinators to become a member and start your journey of growth and learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-red text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold">
              Contact Department
            </button>
            <button className="border border-primary-red text-primary-red px-6 py-3 rounded-lg hover:bg-red-50 font-semibold">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clubs