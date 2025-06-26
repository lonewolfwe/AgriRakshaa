
import { Code, Database, Zap, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const ApiReference = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            API <span className="text-blue-500">Reference</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Complete reference documentation for all CropWhisperer API endpoints, parameters, and responses.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <Database className="w-4 h-4 mr-1" />
              API Version 1.0
            </span>
            <span className="flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              Base URL: api.cropwhisperer.com
            </span>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="analyze" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analyze">Analyze Image</TabsTrigger>
              <TabsTrigger value="usage">Usage Stats</TabsTrigger>
              <TabsTrigger value="auth">Authentication</TabsTrigger>
              <TabsTrigger value="errors">Error Codes</TabsTrigger>
            </TabsList>

            <TabsContent value="analyze" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Badge variant="default" className="bg-green-500">POST</Badge>
                        <span>/v1/analyze</span>
                      </CardTitle>
                      <CardDescription>Analyze crop images for diseases and growth stage</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Request</h3>
                    <div className="bg-gray-900 rounded-lg p-4 mb-4">
                      <code className="text-green-400">
                        POST https://api.cropwhisperer.com/v1/analyze
                      </code>
                    </div>
                    
                    <h4 className="font-semibold mb-2">Headers</h4>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Header</th>
                            <th className="text-left py-2">Value</th>
                            <th className="text-left py-2">Required</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 font-mono">Authorization</td>
                            <td className="py-2">Bearer YOUR_API_KEY</td>
                            <td className="py-2"><Badge variant="destructive">Required</Badge></td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono">Content-Type</td>
                            <td className="py-2">multipart/form-data</td>
                            <td className="py-2"><Badge variant="destructive">Required</Badge></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className="font-semibold mb-2">Form Data Parameters</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Parameter</th>
                            <th className="text-left py-2">Type</th>
                            <th className="text-left py-2">Description</th>
                            <th className="text-left py-2">Required</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 font-mono">image</td>
                            <td className="py-2">File</td>
                            <td className="py-2">Image file (JPEG, PNG, WebP). Max 10MB</td>
                            <td className="py-2"><Badge variant="destructive">Required</Badge></td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono">language</td>
                            <td className="py-2">String</td>
                            <td className="py-2">Response language (en, mr, hi, te, ta, gu)</td>
                            <td className="py-2"><Badge variant="secondary">Optional</Badge></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Response</h3>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "disease": {
    "name": "Bacterial Leaf Spot",
    "description": "A common bacterial infection affecting leaves...",
    "severity": "Medium",
    "confidence": 87
  },
  "growthStage": {
    "stage": "Vegetative Growth",
    "description": "Plant is in active vegetative growth phase...",
    "expectedDuration": "4-6 weeks"
  },
  "treatments": {
    "organic": [
      {
        "name": "Copper Spray",
        "instructions": "Apply in early morning or evening...",
        "materials": ["Copper sulfate", "Water", "Spreader"]
      }
    ],
    "chemical": [
      {
        "name": "Streptomycin Treatment",
        "instructions": "Apply every 7-10 days...",
        "activeIngredient": "Streptomycin sulfate",
        "dosage": "200 ppm"
      }
    ]
  },
  "generalRecommendations": [
    "Improve air circulation around plants",
    "Avoid overhead watering",
    "Remove infected plant debris"
  ]
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Response Fields</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">disease</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          <li><code>name</code> - Disease or condition name</li>
                          <li><code>description</code> - Detailed description</li>
                          <li><code>severity</code> - Low, Medium, or High</li>
                          <li><code>confidence</code> - Confidence score (0-100)</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">growthStage</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          <li><code>stage</code> - Current growth stage</li>
                          <li><code>description</code> - Stage description</li>
                          <li><code>expectedDuration</code> - Expected duration</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-blue-500 text-blue-500">GET</Badge>
                        <span>/v1/usage</span>
                      </CardTitle>
                      <CardDescription>Get current API usage statistics</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Request</h3>
                    <div className="bg-gray-900 rounded-lg p-4 mb-4">
                      <code className="text-green-400">
                        GET https://api.cropwhisperer.com/v1/usage
                      </code>
                    </div>
                    
                    <h4 className="font-semibold mb-2">Headers</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Header</th>
                            <th className="text-left py-2">Value</th>
                            <th className="text-left py-2">Required</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 font-mono">Authorization</td>
                            <td className="py-2">Bearer YOUR_API_KEY</td>
                            <td className="py-2"><Badge variant="destructive">Required</Badge></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Response</h3>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-gray-300 text-sm">
{`{
  "requestsUsed": 245,
  "requestsLimit": 5000,
  "resetDate": "2024-07-01T00:00:00Z",
  "plan": "pro",
  "overageAllowed": true
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="auth" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>API key management and validation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">API Key Format</h3>
                    <p className="text-gray-600 mb-4">
                      API keys are 64-character strings that start with "cw_" followed by random alphanumeric characters.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-green-400">
                        cw_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Validation</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="border-blue-500 text-blue-500">GET</Badge>
                        <code>/v1/auth/validate</code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Validate your API key and get account information.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Security Best Practices</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Never expose API keys in client-side code</li>
                      <li>Use environment variables to store keys</li>
                      <li>Rotate keys regularly</li>
                      <li>Monitor usage for suspicious activity</li>
                      <li>Use HTTPS for all API requests</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="errors" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Error Codes</CardTitle>
                  <CardDescription>Common HTTP status codes and error responses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">HTTP Status Codes</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <span className="font-semibold">200 OK</span>
                          <p className="text-sm text-gray-600">Request successful</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                        <div>
                          <span className="font-semibold">400 Bad Request</span>
                          <p className="text-sm text-gray-600">Invalid request parameters</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <div>
                          <span className="font-semibold">401 Unauthorized</span>
                          <p className="text-sm text-gray-600">Invalid or missing API key</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <div>
                          <span className="font-semibold">413 Payload Too Large</span>
                          <p className="text-sm text-gray-600">Image file exceeds 10MB limit</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <div>
                          <span className="font-semibold">429 Too Many Requests</span>
                          <p className="text-sm text-gray-600">Rate limit exceeded</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <div>
                          <span className="font-semibold">500 Internal Server Error</span>
                          <p className="text-sm text-gray-600">Server error, please try again</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Error Response Format</h3>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <pre className="text-gray-300 text-sm">
{`{
  "error": {
    "code": "INVALID_IMAGE_FORMAT",
    "message": "Unsupported image format. Please use JPEG, PNG, or WebP.",
    "details": {
      "acceptedFormats": ["image/jpeg", "image/png", "image/webp"],
      "receivedFormat": "image/gif"
    }
  }
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Common Error Codes</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Code</th>
                            <th className="text-left py-2">Description</th>
                            <th className="text-left py-2">Resolution</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 font-mono">INVALID_API_KEY</td>
                            <td className="py-2">API key is invalid or expired</td>
                            <td className="py-2">Check your API key</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono">RATE_LIMIT_EXCEEDED</td>
                            <td className="py-2">Too many requests</td>
                            <td className="py-2">Wait or upgrade plan</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono">INVALID_IMAGE_FORMAT</td>
                            <td className="py-2">Unsupported image format</td>
                            <td className="py-2">Use JPEG, PNG, or WebP</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono">IMAGE_TOO_LARGE</td>
                            <td className="py-2">Image exceeds size limit</td>
                            <td className="py-2">Compress image under 10MB</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

export default ApiReference;
