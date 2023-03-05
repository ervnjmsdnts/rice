import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "./firebase";

export const useLogin = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true);
      setError();
      const conditions = [
        where("email", "==", payload.email),
        where("password", "==", payload.password),
      ];
      const ref = collection(db, "users");
      const filterQuery = query(ref, ...conditions);
      const user = await getDocs(filterQuery);
      if (!user.size) {
        return setError("User does not exist");
      }
      setResponse({ id: user.docs[0].id, ...user.docs[0].data() });
    } catch (e) {
      setError(e);
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    data: response,
    error,
    isValidating,
    execute,
  };
};

export const useAddUser = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true);
      setError();
      const conditions = [where("email", "==", payload.email)];
      const ref = collection(db, "users");
      const filterQuery = query(ref, ...conditions);
      const user = await getDocs(filterQuery);
      if (user.size) {
        return setError("User already exist");
      }

      await addDoc(collection(db, "users"), {
        ...payload,
        isActive: true,
        createdAt: new Date().getTime(),
      });

      setResponse(true);
    } catch (e) {
      setError(e);
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    data: response,
    error,
    isValidating,
    execute,
  };
};

export const useAddPayment = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true);
      setError();

      const { operationIds, ...rest } = payload;

      const res = await addDoc(collection(db, "payments"), {
        ...rest,
        isActive: true,
        createdAt: new Date().getTime(),
      });

      const operationsCollection = collection(db, "operations");
      const batch = writeBatch(db);

      operationIds.forEach(async (id) => {
        const operationRef = doc(operationsCollection, id);
        batch.update(operationRef, { isPaid: true });
      });

      await batch.commit();

      setResponse(res);
    } catch (e) {
      setError(e);
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    data: response,
    error,
    isValidating,
    execute,
  };
};

export const useAddOperation = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true);
      setError();

      const res = await addDoc(collection(db, "operations"), {
        ...payload,
        isActive: true,
        createdAt: new Date().getTime(),
      });

      setResponse(res);
    } catch (e) {
      setError(e);
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    data: response,
    error,
    isValidating,
    execute,
  };
};

export const useEditUser = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (payload = {}, userId) => {
    try {
      setIsValidating(true);
      setError();

      await updateDoc(doc(db, "users", userId), {
        ...payload,
        isActive: true,
      });

      setResponse(true);
    } catch (e) {
      setError(e);
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    data: response,
    error,
    isValidating,
    execute,
  };
};

export const useDeleteUser = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (userId) => {
    try {
      setIsValidating(true);
      setError();

      const res = await updateDoc(collection(db, "users", userId), {
        isActive: false,
      });

      setResponse(res);
    } catch (e) {
      setError(e);
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    data: response,
    error,
    isValidating,
    execute,
  };
};
