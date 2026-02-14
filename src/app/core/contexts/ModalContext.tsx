"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
  isFlashcardOpen: boolean;
  openFlashcard: () => void;
  closeFlashcard: () => void;
  isSuccessModalOpen: boolean;
  openSuccessModal: () => void;
  closeSuccessModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isFlashcardOpen, setIsFlashcardOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const openFlashcard = () => setIsFlashcardOpen(true);
  const closeFlashcard = () => setIsFlashcardOpen(false);

  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  return (
    <ModalContext.Provider value={{ isFlashcardOpen, openFlashcard, closeFlashcard, isSuccessModalOpen, openSuccessModal, closeSuccessModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};