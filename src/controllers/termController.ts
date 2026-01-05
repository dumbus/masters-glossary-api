import { Request, Response, NextFunction } from 'express';

import { terms, Term } from '../models/term';

// Create term
export const createTerm = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const newItem: Term = { id: Date.now(), name };
    terms.push(newItem);

    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// Read all terms
export const getTerms = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(terms);
  } catch (error) {
    next(error);
  }
};

// Read single term
export const getTermById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const term = terms.find((t) => t.id === id);

    if (!term) {
      res.status(404).json({ message: 'Term not found' });
      return;
    }

    res.json(term);
  } catch (error) {
    next(error);
  }
};

// Update a term
export const updateTerm = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;

    const termIndex = terms.findIndex((t) => t.id === id);

    if (termIndex === -1) {
      res.status(404).json({ message: 'Term not found' });
      return;
    }
    terms[termIndex].name = name;

    res.json(terms[termIndex]);
  } catch (error) {
    next(error);
  }
};

// Delete a term
export const deleteTerm = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);

    const termIndex = terms.findIndex((t) => t.id === id);

    if (termIndex === -1) {
      res.status(404).json({ message: 'Term not found' });
      return;
    }
    const deletedTerm = terms.splice(termIndex, 1)[0];

    res.json(deletedTerm);
  } catch (error) {
    next(error);
  }
};
