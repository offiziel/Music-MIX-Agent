import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const APIContext = createContext(null);

export const APIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [presetData, setPresetData] = useState(null);
  const [styles, setStyles] = useState(null);

  /**
   * Analyze audio file
   */
  const analyzeAudio = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('audio', file);

      const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 60000 // 60 seconds timeout
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || 'Analysis failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Analysis failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generate mixing preset
   */
  const generatePreset = async (analysisData, style, vocalType = 'main') => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/generate-preset`, {
        analysisData,
        style,
        vocalType
      }, {
        timeout: 60000 // 60 seconds for AI processing
      });

      if (response.data.success) {
        const preset = response.data.data;
        setPresetData(preset);
        return preset;
      } else {
        throw new Error(response.data.error || 'Preset generation failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Preset generation failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get plugin instructions
   */
  const getPluginInstructions = async (pluginName, style, analysisData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/get-instructions`, {
        pluginName,
        style,
        analysisData
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || 'Failed to get instructions');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to get instructions';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch available styles
   */
  const fetchStyles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/styles`);

      if (response.data.success) {
        setStyles(response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data.error || 'Failed to fetch styles');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to fetch styles';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Health check
   */
  const healthCheck = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`, {
        timeout: 5000
      });
      return response.data;
    } catch (err) {
      console.error('[API] Health check failed:', err);
      return { success: false, error: err.message };
    }
  };

  const value = {
    loading,
    error,
    presetData,
    styles,
    analyzeAudio,
    generatePreset,
    getPluginInstructions,
    fetchStyles,
    healthCheck,
    setError
  };

  return (
    <APIContext.Provider value={value}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within APIProvider');
  }
  return context;
};
