import { useState, useEffect } from "react";

interface Field {
  nameField: string;
  value: string;
}

interface Section {
  idSection: number;
  fields: Field[];
}

interface Payment {
  idSolicitud: number;
  sections: Section[];
  currentSection: number;
}

const usePaymentStorage = (idSolicitud: number) => {
  const [paymentData, setPaymentData] = useState<Payment | null>(null);

  useEffect(() => {
    const storedPayments = localStorage.getItem("payments");
    if (storedPayments) {
      const payments: Payment[] = JSON.parse(storedPayments);
      const currentPayment = payments.find(
        (p) => p.idSolicitud === idSolicitud
      );
      if (currentPayment) {
        setPaymentData(currentPayment);
      }
    }
  }, [idSolicitud]);

  const updateSection = (
    sectionId: number,
    newFields: Field[],
    currentSection: number
  ) => {
    setPaymentData((prevData) => {
      if (!prevData) {
        const newPayment: Payment = {
          idSolicitud,
          sections: [{ idSection: sectionId, fields: newFields }],
          currentSection,
        };
        updateLocalStorage(newPayment);
        return newPayment;
      }

      const updatedSections = prevData.sections.some(
        (s) => s.idSection === sectionId
      )
        ? prevData.sections.map((s) => {
            if (s.idSection === sectionId) {
              // Combinar campos existentes con nuevos campos
              const updatedFields = [...s.fields];
              newFields.forEach((newField) => {
                const existingFieldIndex = updatedFields.findIndex(
                  (f) => f.nameField === newField.nameField
                );
                if (existingFieldIndex !== -1) {
                  // Actualizar campo existente
                  updatedFields[existingFieldIndex] = newField;
                } else {
                  // Agregar nuevo campo
                  updatedFields.push(newField);
                }
              });
              return { ...s, fields: updatedFields };
            }
            return s;
          })
        : [...prevData.sections, { idSection: sectionId, fields: newFields }];

      const updatedPayment = {
        ...prevData,
        sections: updatedSections,
        currentSection,
      };
      updateLocalStorage(updatedPayment);
      return updatedPayment;
    });
  };

  const updateCurrentSection = (newSection: number) => {
    setPaymentData((prevData) => {
      if (!prevData) {
        const newPayment: Payment = {
          idSolicitud,
          sections: [],
          currentSection: newSection,
        };
        updateLocalStorage(newPayment);
        return newPayment;
      }

      const updatedPayment = {
        ...prevData,
        currentSection: newSection,
      };
      updateLocalStorage(updatedPayment);
      return updatedPayment;
    });
  };

  const updateLocalStorage = (updatedPayment: Payment) => {
    const storedPayments = localStorage.getItem("payments");
    const payments: Payment[] = storedPayments
      ? JSON.parse(storedPayments)
      : [];

    const index = payments.findIndex((p) => p.idSolicitud === idSolicitud);
    if (index !== -1) {
      payments[index] = updatedPayment;
    } else {
      payments.push(updatedPayment);
    }

    localStorage.setItem("payments", JSON.stringify(payments));
  };

  const getCurrentSection = (): number => {
    return paymentData?.currentSection || 1;
  };

  return {
    paymentData,
    updateSection,
    updateCurrentSection,
    getCurrentSection,
  };
};

export default usePaymentStorage;
