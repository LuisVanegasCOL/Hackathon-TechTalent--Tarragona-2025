import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PowerBIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PowerBIModal: React.FC<PowerBIModalProps> = ({ isOpen, onClose }) => {
  const openInNewTab = () => {
    window.open(
      'https://app.powerbi.com/reportEmbed?reportId=e6d61033-a272-47bf-930d-24354f55afe7&autoAuth=true&ctid=14cb4ab4-62b8-45a2-a944-e225383ee1f9',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              📊 Dashboard PowerBI - Marketplace Tarragona
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={openInNewTab}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Abrir en nueva pestaña</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-4 pt-2 h-full">
          <div className="w-full h-full min-h-[500px] border rounded-lg overflow-hidden bg-gray-50">
            <iframe
              title="hackathon"
              width="100%"
              height="100%"
              src="https://app.powerbi.com/reportEmbed?reportId=e6d61033-a272-47bf-930d-24354f55afe7&autoAuth=true&ctid=14cb4ab4-62b8-45a2-a944-e225383ee1f9"
              frameBorder="0"
              allowFullScreen={true}
              style={{
                border: 'none',
                width: '100%',
                height: '100%',
                minHeight: '500px'
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PowerBIModal; 