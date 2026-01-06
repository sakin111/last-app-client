

interface LogContext {
  userId?: string;
  endpoint?: string;
  method?: string;
  timestamp?: string;
}


export class ProductionLogger {
  private isProduction = process.env.NODE_ENV === 'production';

  
  info(message: string, context?: LogContext): void {
    if (!this.isProduction) {
      console.log(`[INFO] ${message}`, context);
    }
  }


  warn(message: string, context?: LogContext): void {
    if (!this.isProduction) {
      console.warn(`[WARN] ${message}`, context);
    }
  }


  error(
    message: string,
    error?: Error | unknown,
    context?: LogContext
  ): void {
    const timestamp = new Date().toISOString();

    if (this.isProduction) {
  
      const safeLog = {
        message,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        ...context,
        timestamp,
      };

    
      console.error(JSON.stringify(safeLog));

  
    } else {
      
      console.error(`[ERROR] ${message}`, {
        error,
        ...context,
        timestamp,
      });
    }
  }

 
  apiError(
    endpoint: string,
    method: string,
    statusCode: number,
    error?: Error | unknown,
    context?: LogContext
  ): void {
    this.error(
      `API Error: ${method} ${endpoint} (${statusCode})`,
      error,
      {
        endpoint,
        method,
        ...context,
      }
    );
  }

 
  authError(
    action: string,
    error?: Error | unknown,
    context?: LogContext
  ): void {
    this.error(
      `Auth Error: ${action}`,
      error,
      {
        ...context,
      }
    );
  }


  validationError(
    field: string,
    reason: string,
    context?: LogContext
  ): void {
    this.warn(
      `Validation Error: ${field} - ${reason}`,
      context
    );
  }
}

export const logger = new ProductionLogger();
