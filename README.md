# Commands

## GET
Command to get objects of the backend

- get [objectType] [{data, options}]

### For example:
To get all the celestials
```bash
get celestials {"object": {}, "options": {"all": true}} 
```

Or to get an specific spaceship
```bash
get spaceship {"object": {}, "options": {"all": false, "uuid": "uuid-of-spaceship"}} 
```

## CREATE
Command to create new objects in the backend

- create [objectType] [{data, options}]

### For example:
To create a new celestial
```bash
create celestial {"object": {"radius": 1, "distanceFromSun": 10, "angle": 278}, "options": {}}
```

To create a spaceship
```bash
create spaceship {"object": {"name": "GUH", "orbitingCelestial": true, "celestialOrbiting": "caef83aa-ca14-4bb0-9026-955a1d494532", "currentJourney": "", "velocity": 1}, "options": {}}
```
