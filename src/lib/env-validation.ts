

const requiredEnvVars = {
  NEXT_PUBLIC_BASE_API_URL: {
    required: true,
    description: 'Backend API URL',
    isPublic: true,
  },
  JWT_SECRET: {
    required: true,
    description: 'JWT Secret for token verification',
    isPublic: false,
  },
};

const optionalEnvVars = {
  STRIPE_SECRET_KEY: {
    required: false,
    description: 'Stripe secret key for payments',
    isPublic: false,
  },
  STRIPE_WEBHOOK_SECRET: {
    required: false,
    description: 'Stripe webhook secret',
    isPublic: false,
  },
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: {
    required: false,
    description: 'Stripe publishable key',
    isPublic: true,
  },
};


export function validateEnvironmentVariables(): void {
  const missing: string[] = [];
  const warnings: string[] = [];

  
  Object.entries(requiredEnvVars).forEach(([key, config]) => {
    const value = process.env[key];
    
    if (!value) {
      missing.push(`${key} (${config.description})`);
    }
    
    
    if (
      !config.isPublic &&
      process.env.NODE_ENV === 'production' &&
      value &&
      (value === 'moonlight1' || value.length < 16)
    ) {
      warnings.push(`${key} appears to be weak or a default value in production`);
    }
  });


  Object.entries(optionalEnvVars).forEach(([key, config]) => {
    const value = process.env[key];
    
    if (process.env.NODE_ENV === 'production' && !value && key.includes('STRIPE')) {
      warnings.push(
        `${key} is not configured - Stripe payments will not work`
      );
    }
  });


  if (missing.length > 0) {
    const errorMessage = [
      'Missing required environment variables:',
      ...missing.map(v => `  - ${v}`),
    ].join('\n');
    
    throw new Error(errorMessage);
  }

 
  if (process.env.NODE_ENV === 'development' && warnings.length > 0) {
    console.warn('Environment variable warnings:');
    warnings.forEach(w => console.warn(`  ⚠️  ${w}`));
  }

  if (process.env.NODE_ENV === 'production' && warnings.length > 0) {
    console.error('Environment variable warnings in production:');
    warnings.forEach(w => console.error(`  ⚠️  ${w}`));
  }
}


export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  
  return value;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}
