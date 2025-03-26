
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import HomeButton from "@/components/HomeButton";
import StarRating from "@/components/StarRating";
import { generateTestScenarios } from "@/utils/openai";
import { exportToHtml } from "@/utils/htmlExport";

const TestPage = () => {
  const { domain, testType } = useParams<{ domain: string; testType: string }>();
  const navigate = useNavigate();
  
  const [isGenerating, setIsGenerating] = useState(true);
  const [scenarios, setScenarios] = useState("");
  const [specificRequirements, setSpecificRequirements] = useState("");
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [customRequirements, setCustomRequirements] = useState<Array<{text: string, rating: number | null}>>([]);
  
  useEffect(() => {
    if (!domain || !testType) {
      navigate("/");
      return;
    }
    
    const fetchScenarios = async () => {
      try {
        setIsGenerating(true);
        const generatedScenarios = await generateTestScenarios(domain, testType);
        setScenarios(generatedScenarios);
      } catch (error) {
        console.error("Error generating scenarios:", error);
        toast.error("Failed to generate test scenarios");
        setScenarios("Error generating test scenarios. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    };
    
    fetchScenarios();
  }, [domain, testType, navigate]);
  
  const handleSubmit = async () => {
    if (!specificRequirements.trim()) {
      toast.warning("Please enter specific requirements");
      return;
    }
    
    try {
      setIsGenerating(true);
      const savedRequirement = specificRequirements;
      
      const generatedScenarios = await generateTestScenarios(
        domain || "",
        testType || "",
        specificRequirements
      );
      
      // Add the custom requirement to the tracking array
      setCustomRequirements(prev => [...prev, {
        text: savedRequirement,
        rating: null
      }]);
      
      // Add only the custom requirement and its scenarios to the main text area,
      // not duplicating the original scenarios
      setScenarios(prev => {
        return `${prev}\n\n## Custom Requirement: ${savedRequirement}\n${generatedScenarios.split('\n').filter(line => !line.includes("# ") && !line.includes("## ")).join('\n')}`;
      });
      
      // Clear the requirements text area after submission
      setSpecificRequirements("");
      
      toast.success("Test scenarios updated based on your requirements");
    } catch (error) {
      console.error("Error generating scenarios:", error);
      toast.error("Failed to update test scenarios");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownload = () => {
    if (!scenarios.trim()) {
      toast.warning("No scenarios to download");
      return;
    }
    
    try {
      // Remove the custom requirements parameter since we're consolidating everything
      exportToHtml(
        scenarios, 
        domain || "", 
        testType || "", 
        undefined,
        rating
      );
      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report");
    }
  };
  
  const handleRating = (newRating: number) => {
    setRating(newRating);
    toast.success(`Thank you for rating ${newRating} stars!`);
    setShowRating(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-16">
      <HomeButton />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold text-center">
            {domain} - {testType}
          </h1>
        </header>
        
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-3">
            <h2 className="text-xl font-medium">Generated Test Scenarios</h2>
            {isGenerating ? (
              <div className="test-area flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 animate-pulse">Generating test scenarios...</div>
                  <div className="w-8 h-8 border-4 border-appblue-light border-t-appblue-dark rounded-full animate-spin mx-auto"></div>
                </div>
              </div>
            ) : (
              <textarea
                className="test-area font-mono text-sm"
                value={scenarios}
                onChange={(e) => setScenarios(e.target.value)}
              />
            )}
          </div>
          
          <div className="space-y-3">
            <h2 className="text-xl font-medium">Any more specific requirements?</h2>
            <textarea
              className="secondary-input"
              placeholder="Enter specific requirements to refine the test scenarios..."
              value={specificRequirements}
              onChange={(e) => setSpecificRequirements(e.target.value)}
              disabled={isGenerating}
            />
          </div>
          
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <button
              className="download-button"
              onClick={handleDownload}
              disabled={isGenerating || !scenarios.trim()}
            >
              Download Report
            </button>
            
            {showRating ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Rate this response:</span>
                <StarRating onChange={handleRating} />
              </div>
            ) : (
              <button
                className="rate-button"
                onClick={() => setShowRating(true)}
                disabled={isGenerating || !scenarios.trim()}
              >
                Rate Response
              </button>
            )}
            
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={isGenerating || !specificRequirements.trim()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
