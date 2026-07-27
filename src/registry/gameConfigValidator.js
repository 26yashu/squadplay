export function validateGameConfig(config, allIds) {
  if (process.env.NODE_ENV !== 'development') {
    return {
      ...config,
      setupSteps: Array.isArray(config.setupSteps) ? config.setupSteps : [],
      supportsCategory: !!config.supportsCategory,
      supportsDifficulty: !!config.supportsDifficulty,
      supportsTimer: !!config.supportsTimer,
      supportsRounds: !!config.supportsRounds,
      supportsTeams: !!config.supportsTeams,
      supportsMode: !!config.supportsMode,
      supportsWheelOptions: !!config.supportsWheelOptions,
      minPlayers: config.minPlayers ?? 1,
      maxPlayers: config.maxPlayers ?? 4,
      accentColor: config.accentColor || 'text-white',
      xpRewards: config.xpRewards || { play: 10 }
    };
  }
  
  const warnings = [];
  
  if (!config) {
    console.error('[Config Validator] Null configuration found');
    return null;
  }
  
  // 1. Check required fields
  const required = ['id', 'title', 'icon', 'minPlayers', 'maxPlayers'];
  required.forEach(field => {
    if (config[field] === undefined || config[field] === null) {
      warnings.push(`Missing required property: '${field}'`);
    }
  });

  // 2. Validate IDs
  if (config.id) {
    if (allIds.has(config.id)) {
      warnings.push(`Duplicate game id found: '${config.id}'`);
    } else {
      allIds.add(config.id);
    }
  }

  // 3. Validate player limits
  if (typeof config.minPlayers === 'number' && typeof config.maxPlayers === 'number') {
    if (config.minPlayers > config.maxPlayers) {
      warnings.push(`Invalid player limits: minPlayers (${config.minPlayers}) > maxPlayers (${config.maxPlayers})`);
    }
    if (config.minPlayers < 1) {
      warnings.push(`Invalid minPlayers: ${config.minPlayers} (Must be >= 1)`);
    }
  }

  // 4. Validate setup steps
  if (!config.setupSteps || !Array.isArray(config.setupSteps)) {
    warnings.push(`Missing or invalid 'setupSteps'. Defaulting to [].`);
  } else {
    const stepSet = new Set();
    config.setupSteps.forEach(step => {
      if (stepSet.has(step)) {
        warnings.push(`Duplicate setup step: '${step}'`);
      }
      stepSet.add(step);
    });
    
    // Ensure 'player' comes first and 'ready' comes last if they exist
    if (config.setupSteps.length > 0) {
      if (config.setupSteps[0] !== 'player' && config.setupSteps.includes('player')) {
        warnings.push(`Setup flow ordering issue: 'player' step should be first.`);
      }
      if (config.setupSteps[config.setupSteps.length - 1] !== 'ready' && config.setupSteps.includes('ready')) {
        warnings.push(`Setup flow ordering issue: 'ready' step should be last.`);
      }
    }
  }

  if (warnings.length > 0) {
    console.warn(`[Config Validator] Warnings for Game '${config.id || 'Unknown'}':`, warnings);
  }

  // Enforce safe defaults
  return {
    ...config,
    setupSteps: Array.isArray(config.setupSteps) ? config.setupSteps : [],
    supportsCategory: !!config.supportsCategory,
    supportsDifficulty: !!config.supportsDifficulty,
    supportsTimer: !!config.supportsTimer,
    supportsRounds: !!config.supportsRounds,
    supportsTeams: !!config.supportsTeams,
    supportsMode: !!config.supportsMode,
    supportsWheelOptions: !!config.supportsWheelOptions,
    minPlayers: config.minPlayers ?? 1,
    maxPlayers: config.maxPlayers ?? 4,
    accentColor: config.accentColor || 'text-white',
    xpRewards: config.xpRewards || { play: 10 }
  };
}
