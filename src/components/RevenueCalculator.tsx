
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, BarChart3, LineChart, Users, PhoneCall } from "lucide-react";
import ResultsChart from "./ResultsChart";

const RevenueCalculator = () => {
  // Input states
  const [currentRevenue, setCurrentRevenue] = useState<number>(1000000);
  const [conversionRate, setConversionRate] = useState<number>(10);
  const [dealSize, setDealSize] = useState<number>(5000);
  const [salesReps, setSalesReps] = useState<number>(5);
  const [conversionImprovement, setConversionImprovement] = useState<number>(10);
  const [salesGrowth, setSalesGrowth] = useState<number>(15);
  const [dealSizeGrowth, setDealSizeGrowth] = useState<number>(10);

  // Results states
  const [projectedRevenue, setProjectedRevenue] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);
  const [exitValue, setExitValue] = useState<number>(0);
  
  // Industry multiple (example value, could be made configurable)
  const industryMultiple = 4;

  // Calculate results whenever inputs change
  useEffect(() => {
    // Calculate projected revenue
    const newProjectedRevenue = currentRevenue * 
      (1 + (conversionImprovement / 100)) * 
      (1 + (salesGrowth / 100)) * 
      (1 + (dealSizeGrowth / 100));
    
    // Calculate ROI
    const newRoi = ((newProjectedRevenue - currentRevenue) / currentRevenue) * 100;
    
    // Calculate exit value
    const newExitValue = newProjectedRevenue * industryMultiple;
    
    setProjectedRevenue(newProjectedRevenue);
    setRoi(newRoi);
    setExitValue(newExitValue);
  }, [
    currentRevenue,
    conversionRate,
    dealSize,
    salesReps,
    conversionImprovement,
    salesGrowth,
    dealSizeGrowth
  ]);

  // Format number as currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format number as percentage
  const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      maximumFractionDigits: 1
    }).format(value / 100);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Step 1: Input Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Step 1: Your Current Metrics
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentRevenue" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Current Annual Revenue
            </Label>
            <Input
              id="currentRevenue"
              type="number"
              min="0"
              value={currentRevenue}
              onChange={(e) => setCurrentRevenue(Math.max(0, Number(e.target.value)))}
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="conversionRate" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Current Sales Conversion Rate ({conversionRate}%)
            </Label>
            <Slider
              id="conversionRate"
              min={0}
              max={100}
              step={1}
              value={[conversionRate]}
              onValueChange={(value) => setConversionRate(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dealSize" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Average Deal Size
            </Label>
            <Input
              id="dealSize"
              type="number"
              min="0"
              value={dealSize}
              onChange={(e) => setDealSize(Math.max(0, Number(e.target.value)))}
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salesReps" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Number of Sales Reps
            </Label>
            <Input
              id="salesReps"
              type="number"
              min="1"
              value={salesReps}
              onChange={(e) => setSalesReps(Math.max(1, Number(e.target.value)))}
              className="font-mono"
            />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold flex items-center gap-2 mt-8">
          <LineChart className="h-5 w-5" />
          Step 2: Expected Improvements
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="conversionImprovement" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Expected Conversion Rate Improvement ({conversionImprovement}%)
            </Label>
            <Slider
              id="conversionImprovement"
              min={0}
              max={50}
              step={1}
              value={[conversionImprovement]}
              onValueChange={(value) => setConversionImprovement(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salesGrowth" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Expected Sales Growth Rate ({salesGrowth}%)
            </Label>
            <Slider
              id="salesGrowth"
              min={0}
              max={50}
              step={1}
              value={[salesGrowth]}
              onValueChange={(value) => setSalesGrowth(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dealSizeGrowth" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Expected Average Deal Size Growth ({dealSizeGrowth}%)
            </Label>
            <Slider
              id="dealSizeGrowth"
              min={0}
              max={50}
              step={1}
              value={[dealSizeGrowth]}
              onValueChange={(value) => setDealSizeGrowth(value[0])}
            />
          </div>
        </div>
      </div>
      
      {/* Step 2: Results Display Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Step 3: Your Growth Potential
        </h2>
        
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-blue-600">Projected Annual Revenue</h3>
                <div className="text-3xl font-bold text-blue-900">{formatCurrency(projectedRevenue)}</div>
                <div className="text-sm text-blue-600 mt-1">
                  From {formatCurrency(currentRevenue)}
                </div>
              </div>
              <Progress value={Math.min(100, (projectedRevenue / currentRevenue) * 50)} className="h-2 bg-blue-100" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-green-600">Projected ROI</h3>
                <div className="text-3xl font-bold text-green-900">{roi.toFixed(1)}%</div>
                <div className="text-sm text-green-600 mt-1">
                  Return on Investment
                </div>
              </div>
              <Progress value={Math.min(100, roi / 2)} className="h-2 bg-green-100" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-fuchsia-50 border-purple-200">
            <CardContent className="pt-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-purple-600">Potential Business Value</h3>
                <div className="text-3xl font-bold text-purple-900">{formatCurrency(exitValue)}</div>
                <div className="text-sm text-purple-600 mt-1">
                  Based on {industryMultiple}x industry multiple
                </div>
              </div>
              <Progress value={Math.min(100, (exitValue / (currentRevenue * industryMultiple)) * 50)} className="h-2 bg-purple-100" />
            </CardContent>
          </Card>
          
          <ResultsChart 
            currentRevenue={currentRevenue} 
            projectedRevenue={projectedRevenue} 
            currentValue={currentRevenue * industryMultiple}
            projectedValue={exitValue}
          />
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <PhoneCall className="h-5 w-5" />
              Step 4: Take Action
            </h2>
            <Button className="w-full py-6 text-base font-semibold bg-blue-600 hover:bg-blue-700">
              Book a Strategy Session
            </Button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Let our experts show you how to achieve these results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCalculator;
