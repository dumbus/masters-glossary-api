import { Request, Response, NextFunction } from 'express';

import { terms, Term } from '../models/term';

// Create term
export const createTerm = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { term, description, relations } = req.body;

    const newItem: Term = {
      id: Date.now(),
      term,
      description,
      relations: relations || [],
    };
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
    const { term, description, relations } = req.body;

    const termIndex = terms.findIndex((t) => t.id === id);

    if (termIndex === -1) {
      res.status(404).json({ message: 'Term not found' });
      return;
    }
    if (term !== undefined) {
      terms[termIndex].term = term;
    }
    if (description !== undefined) {
      terms[termIndex].description = description;
    }
    if (relations !== undefined) {
      terms[termIndex].relations = relations;
    }

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
