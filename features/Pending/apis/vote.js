export default function vote(payload){
  return fetch('/api/vote', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(payload)
  }).then(response => response.json())
}