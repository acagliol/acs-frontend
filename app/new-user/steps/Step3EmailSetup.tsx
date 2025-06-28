import React, { useState } from 'react';
import { Mail, CheckCircle2, Shield, Zap, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EmailData {
    responseEmail: string;
    customDomain: string;
    customEmail: string;
    emailOption: 'default' | 'custom';
}

interface Step3EmailSetupProps {
  data: EmailData;
  setData: (data: EmailData) => void;
  onContinue: () => void;
  onBack: () => void;
  loading: boolean;
}

const Step3EmailSetup: React.FC<Step3EmailSetupProps> = ({
  data,
  setData,
  onContinue,
  onBack,
  loading,
}) => {
  const [emailStatus, setEmailStatus] = useState<{ available: boolean; message: string } | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-card border border-border/50 rounded-xl shadow-sm p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="w-4 h-4 text-primary" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            Email Configuration
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Choose your professional email setup for seamless communication with clients.
          </p>
        </div>

        {/* Email Option Selection */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setData({ ...data, emailOption: 'default' })}
              className={cn(
                "relative p-4 rounded-lg border transition-all duration-200 text-left",
                "hover:shadow-sm hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/40",
                data.emailOption === 'default' 
                  ? "border-primary bg-primary/5 shadow-sm ring-2 ring-primary/40" 
                  : "border-border bg-card hover:bg-accent/50"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-md transition-colors border-2",
                  data.emailOption === 'default' 
                    ? "bg-primary text-muted-foreground border-primary-foreground" 
                    : "bg-card text-muted-foreground border-primary-foreground"
                )}>
                  <Zap className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm mb-1">
                    ACS Domain
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Quick setup with our professional domain
                  </p>
                </div>
              </div>
              {data.emailOption === 'default' && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => setData({ ...data, emailOption: 'custom' })}
              className={cn(
                "relative p-4 rounded-lg border transition-all duration-200 text-left",
                "hover:shadow-sm hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/40",
                data.emailOption === 'custom' 
                  ? "border-primary bg-primary/5 shadow-sm ring-2 ring-primary/40" 
                  : "border-border bg-card hover:bg-accent/50"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-md transition-colors border-2",
                  data.emailOption === 'custom' 
                    ? "bg-primary text-muted-foreground border-primary-foreground" 
                    : "bg-card text-muted-foreground border-primary-foreground"
                )}>
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm mb-1">
                    Custom Domain
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Use your own domain for branding
                  </p>
                </div>
              </div>
              {data.emailOption === 'custom' && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Email Configuration */}
        {data.emailOption === 'default' ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                ACS Email Address
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  name="responseEmail"
                  value={data.responseEmail.split('@')[0]}
                  onChange={e => setData({ ...data, responseEmail: `${e.target.value}@homes.automatedconsultancy.com` })}
                  className="flex-1 text-sm h-9"
                  placeholder="username"
                  autoComplete="off"
                />
                <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                  @homes.automatedconsultancy.com
                </span>
              </div>
            </div>
            
            <div className="bg-accent/30 border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-foreground text-sm">ACS Domain Benefits</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>Secure & spam protected</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>ACS tools integration</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>Professional branding</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>Instant setup</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Custom Email Address
              </label>
              <Input
                type="email"
                name="customEmail"
                value={data.customEmail}
                onChange={handleEmailChange}
                placeholder="your.name@yourdomain.com"
                autoComplete="off"
                className="text-sm h-9"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 text-xs h-8 px-3" 
                disabled={loading}
              >
                <Shield className="w-3 h-3" />
                Verify Identity
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 text-xs h-8 px-3" 
                disabled={loading}
              >
                <CheckCircle2 className="w-3 h-3" />
                Verify DKIM
              </Button>
            </div>
            
            <div className="bg-accent/30 border border-border/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-foreground text-sm">Custom Domain Benefits</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>Full branding control</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>Professional appearance</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>Enhanced trust</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>Email ownership</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-border/50">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="flex items-center gap-2 h-9 px-4"
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </Button>
          <Button 
            type="button" 
            size="sm" 
            onClick={onContinue} 
            disabled={loading}
            className={cn(
              "group flex items-center gap-2 h-9 px-4 font-medium border border-primary bg-card text-primary transition-colors",
              !loading && "hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              loading && "opacity-60 cursor-not-allowed"
            )}
            tabIndex={0}
            aria-label="Continue"
          >
            {loading ? 'Saving...' : (
              <span className="flex items-center gap-2 group-hover:text-primary-foreground group-focus:text-primary-foreground group-active:text-primary-foreground">
                <span className="transition-colors">Continue</span>
                <ArrowRight className="w-3 h-3 transition-colors text-inherit" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step3EmailSetup; 