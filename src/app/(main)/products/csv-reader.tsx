"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React, { useState } from "react";
import { useCSVReader } from "react-papaparse";
import { ProductData } from "./page";

interface Props {
  setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
}

const CsvReader: React.FC<Props> = ({ setProducts }) => {
  const { CSVReader } = useCSVReader();
  const handleCSVFileUpload = (results: any) => {
    const parsedData = results.data.map((row: string[]) => ({
      name: row[0],
      updatedAt: row[1],
    }));
    setProducts(parsedData);
    setShowRemoveButton(true);
  };
  const [showRemoveButton, setShowRemoveButton] = useState(false);

  return (
    <div>
      <CSVReader onUploadAccepted={handleCSVFileUpload}>
        {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => (
          <div className="flex">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                className="flex items-center gap-1"
                type="button"
                {...getRootProps()}
              >
                <Download size={18} />
                <span> Import as CSV</span>
              </Button>
              {showRemoveButton && (
                <>
                  <div className="text-xs font-semibold">
                    {acceptedFile && acceptedFile.name}
                  </div>
                  <button
                    className={` font-semibold text-xs text-red-400`}
                    onClick={() => {
                      setProducts([
                        {
                          name: "",
                          description: "",
                          media: null,
                          chargeTax: false,
                          prices: [],
                          updatedAt: "",
                        },
                      ]);
                      setShowRemoveButton(false);
                    }}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </CSVReader>
    </div>
  );
};

export default CsvReader;
 