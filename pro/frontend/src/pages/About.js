import { Store, Users, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About MyShop</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your trusted destination for quality products and exceptional service since 2020
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            MyShop was founded with a simple mission: to bring high-quality products to customers at affordable prices. What started as a small online store has grown into a trusted marketplace serving thousands of satisfied customers.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We believe in the power of great products to improve lives. Every item in our catalog is carefully selected and vetted to ensure it meets our high standards of quality, value, and sustainability.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
              <p className="text-gray-600">
                Every product is handpicked and tested to ensure the highest quality standards.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="text-gray-600">
                Our dedicated support team is here to help you 24/7 with any questions or concerns.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Value</h3>
              <p className="text-gray-600">
                Competitive prices without compromising on quality or service excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Get in Touch</h2>
          <div className="space-y-4 text-gray-600">
            <p className="flex items-center gap-3">
              <span className="font-semibold">Email:</span> support@myshop.com
            </p>
            <p className="flex items-center gap-3">
              <span className="font-semibold">Phone:</span> +1 (555) 123-4567
            </p>
            <p className="flex items-center gap-3">
              <span className="font-semibold">Address:</span> 123 Shopping Street, Commerce City, CC 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}