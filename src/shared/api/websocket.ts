/**
 * Low-level WebSocket client singleton.
 * Used by useWebSocket composable and the app-level WebSocket provider.
 * This module exports a factory — instantiate per component via useWebSocket().
 */

export type WSReadyState = 'connecting' | 'connected' | 'disconnected' | 'error'

export interface WSMessage<T = unknown> {
  type: string
  payload: T
  timestamp: string
}

export function createWebSocketMessage<T>(type: string, payload: T): WSMessage<T> {
  return {
    type,
    payload,
    timestamp: new Date().toISOString(),
  }
}
