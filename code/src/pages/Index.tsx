
import { useState } from "react";
import { toast } from "sonner";
import AppModal from "@/components/AppModal";

const domains = [
  "Loans",
  "Deposits",
  "Credit Risks",
  "Regulatory Compliances",
  "Assets Liability Management",
  "Customer Information",
  "UI Testing"
];

const Index = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [implementationModalOpen, setImplementationModalOpen] = useState(false);
  
  const handleDomainClick = (domain: string) => {
    if (domain === "UI Testing") {
      setImplementationModalOpen(true);
    } else {
      setSelectedDomain(domain);
      setModalOpen(true);
    }
  };
  
  const handleTestTypeSelect = (testType: string) => {
    setModalOpen(false);
    if (selectedDomain) {
      // Navigate to the test page
      window.location.href = `/test/${encodeURIComponent(selectedDomain)}/${encodeURIComponent(testType)}`;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-50 px-4">
      <header className="pt-16 pb-12 animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-3 text-gray-900">Gen AI Test-Hub</h1>
        <p className="text-lg text-center text-gray-600">Test Scenarios Generator powered by Gen AI</p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full my-8 animate-slide-in-bottom">
        {domains.slice(0, 6).map((domain) => (
          <button
            key={domain}
            className="app-button animate-fade-in"
            style={{ animationDelay: `${domains.indexOf(domain) * 0.1}s` }}
            onClick={() => handleDomainClick(domain)}
          >
            {domain}
          </button>
        ))}
      </div>
      
      <div className="mt-6 mb-12 animate-slide-in-bottom" style={{ animationDelay: "0.6s" }}>
        <button
          className="app-button"
          onClick={() => handleDomainClick("UI Testing")}
        >
          UI Testing
        </button>
      </div>
      
      <div className="w-full max-w-5xl border border-gray-200 rounded-xl p-6 mb-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
        <h2 className="text-2xl font-semibold text-center mb-6">Future Enhancements</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="animate-fade-in" style={{ animationDelay: "0.9s" }}>1. Expanding to wider domains in software industry</li>
          <li className="animate-fade-in" style={{ animationDelay: "1.0s" }}>2. UI Testing - Providing support for Accessibility and User Experience Testing</li>
          <li className="animate-fade-in" style={{ animationDelay: "1.1s" }}>3. More deeper testing capabilities - Integration with real time application code</li>
          <li className="animate-fade-in" style={{ animationDelay: "1.2s" }}>4. Integration with tools to enable more robust testing - Performance Testing, etc..</li>
          <li className="animate-fade-in" style={{ animationDelay: "1.3s" }}>5. Reporting capabilities along with tracking of test improvements.</li>
        </ul>
      </div>
      
      {/* Testing Type Selection Modal */}
      <AppModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h3 className="text-xl font-medium text-center mb-6">Select Testing Type for {selectedDomain}</h3>
        <div className="flex justify-center gap-4">
          <button 
            className="app-button"
            onClick={() => handleTestTypeSelect("API Testing")}
          >
            API Testing
          </button>
          <button 
            className="app-button"
            onClick={() => handleTestTypeSelect("Stress Testing")}
          >
            Stress Testing
          </button>
        </div>
      </AppModal>
      
      {/* Implementation in Progress Modal */}
      <AppModal isOpen={implementationModalOpen} onClose={() => setImplementationModalOpen(false)}>
        <h3 className="text-xl font-medium text-center mb-4">Implementation in Progress...</h3>
        <div className="space-y-3 text-gray-600 mb-4">
          <p>- Accessibility Report on the UI screen</p>
          <p>- User Experience Analysis</p>
          <p>- Dead Links Reporting</p>
          <p>- Custom UI Functional Requirements</p>
        </div>
        <div className="flex justify-center mt-6">
          <button 
            className="app-button"
            onClick={() => setImplementationModalOpen(false)}
          >
            Close
          </button>
        </div>
      </AppModal>
    </div>
  );
};

export default Index;
