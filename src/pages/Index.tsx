
import React from "react";
import RevenueCalculator from "@/components/RevenueCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Revenue Growth Calculator</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how improved sales strategies can dramatically increase your business revenue and valuation.
          </p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Calculate Your Growth Potential</CardTitle>
            <CardDescription>
              Adjust the sliders below to see how improvements in your sales metrics could affect your business growth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueCalculator />
          </CardContent>
        </Card>
        
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Samfield Capital. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
