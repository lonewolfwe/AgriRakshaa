
import { Book, Code, FileText, Zap, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CropWhisperer <span className="text-green-500">Documentation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Complete guides, API references, and examples to help you integrate crop analysis into your applications.
          </p>
        </div>
      </section>

      {/* Quick Start Cards */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Get up and running in 5 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Learn the basics of using our API with simple examples.</p>
                <Button variant="outline" className="w-full">
                  Start Tutorial
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>SDK Guide</CardTitle>
                <CardDescription>JavaScript/TypeScript SDK documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Integrate with our official SDK for seamless development.</p>
                <Button variant="outline" className="w-full">
                  View SDK Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>Complete API endpoint documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Detailed reference for all available endpoints and parameters.</p>
                <Button variant="outline" className="w-full">
                  Browse API
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Documentation Content */}
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
            </TabsList>

            <TabsContent value="getting-started" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started with CropWhisperer API</CardTitle>
                  <CardDescription>Your first steps to integrating crop analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">1. Get Your API Key</h3>
                    <p className="text-gray-600 mb-4">
                      Sign up for a free account and get your API key from the dashboard.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-green-400">
                        curl -X GET https://api.cropwhisperer.com/v1/auth/key
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">2. Make Your First Request</h3>
                    <p className="text-gray-600 mb-4">
                      Upload an image and get instant crop analysis results.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-gray-300 text-sm">
{`curl -X POST https://api.cropwhisperer.com/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@crop_image.jpg" \\
  -F "language=en"`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">3. Handle the Response</h3>
                    <p className="text-gray-600 mb-4">
                      Parse the JSON response to get disease detection and treatment recommendations.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-gray-300 text-sm">
{`{
  "disease": {
    "name": "Healthy",
    "confidence": 95,
    "severity": "Low"
  },
  "growthStage": {
    "stage": "Flowering",
    "expectedDuration": "2-3 weeks"
  },
  "treatments": {...},
  "generalRecommendations": [...]
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="authentication" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>Secure your API requests with proper authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">API Key Authentication</h3>
                    <p className="text-gray-600 mb-4">
                      All API requests must include your API key in the Authorization header.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-green-400">
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Rate Limits</h3>
                    <p className="text-gray-600 mb-4">
                      API requests are limited based on your subscription plan:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Free: 100 requests/month</li>
                      <li>Pro: 5,000 requests/month</li>
                      <li>Enterprise: Unlimited</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Error Handling</h3>
                    <p className="text-gray-600 mb-4">
                      Common HTTP status codes and their meanings:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="space-y-2 text-sm">
                        <li><span className="font-mono bg-green-100 px-2 py-1 rounded">200</span> Success</li>
                        <li><span className="font-mono bg-yellow-100 px-2 py-1 rounded">400</span> Bad Request</li>
                        <li><span className="font-mono bg-red-100 px-2 py-1 rounded">401</span> Unauthorized</li>
                        <li><span className="font-mono bg-red-100 px-2 py-1 rounded">429</span> Rate Limit Exceeded</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                  <CardDescription>Ready-to-use code snippets in multiple languages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">JavaScript/TypeScript SDK</h3>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-gray-300 text-sm">
{`import { CropWhispererSDK } from 'cropwhisperer-sdk';

const sdk = new CropWhispererSDK({
  apiKey: 'your-api-key-here'
});

const result = await sdk.analyzeImage(file, {
  language: 'en'
});

console.log(result.disease.name);`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Python</h3>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-gray-300 text-sm">
{`import requests

url = "https://api.cropwhisperer.com/v1/analyze"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
files = {"image": open("crop.jpg", "rb")}
data = {"language": "en"}

response = requests.post(url, headers=headers, files=files, data=data)
result = response.json()`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">PHP</h3>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-gray-300 text-sm">
{`<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.cropwhisperer.com/v1/analyze",
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer YOUR_API_KEY"
  ],
  CURLOPT_POSTFIELDS => [
    "image" => new CURLFile("crop.jpg"),
    "language" => "en"
  ]
]);

$response = curl_exec($curl);
$result = json_decode($response, true);
?>`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="best-practices" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                  <CardDescription>Optimize your integration for better performance and reliability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Shield className="w-5 h-5 text-green-600 mr-2" />
                      Image Quality Guidelines
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Use high-resolution images (minimum 800x600 pixels)</li>
                      <li>Ensure good lighting conditions</li>
                      <li>Focus on the affected crop area</li>
                      <li>Avoid blurry or heavily compressed images</li>
                      <li>Maximum file size: 10MB</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Users className="w-5 h-5 text-blue-600 mr-2" />
                      Error Handling
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Always check HTTP status codes</li>
                      <li>Implement retry logic for temporary failures</li>
                      <li>Handle rate limiting gracefully</li>
                      <li>Validate image files before upload</li>
                      <li>Use timeouts for network requests</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Zap className="w-5 h-5 text-yellow-600 mr-2" />
                      Performance Tips
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Compress images before upload</li>
                      <li>Use appropriate image formats (JPEG, PNG, WebP)</li>
                      <li>Implement caching for repeated requests</li>
                      <li>Use batch processing for multiple images</li>
                      <li>Monitor your usage and upgrade plans as needed</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
