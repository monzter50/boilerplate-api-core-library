# Package Migration Guide

## Overview

This document provides guidance for migrating npm package names, specifically covering different scenarios and best practices.

## Migration Option 2: Deprecation + Migration Strategy

### When to Use This Option

Use this strategy when you have:
- An existing published package with users
- Need to rename the package to a completely different name
- Want to maintain backward compatibility during transition
- Published package has significant adoption

### Step-by-Step Migration Process

#### Phase 1: Preparation (Week 1)

1. **Announce Migration Plans**
   ```bash
   # Create announcement in README.md, CHANGELOG.md, and GitHub issues
   echo "## Migration Notice" >> README.md
   echo "This package will be migrated to 'new-package-name' starting version X.X.X" >> README.md
   ```

2. **Reserve New Package Name**
   ```bash
   npm search new-package-name  # Verify availability
   npm publish --dry-run        # Test publishing process
   ```

3. **Update Documentation**
   - Create migration guide
   - Update all references to new package name
   - Prepare changelog entries

#### Phase 2: Dual Publishing (Weeks 2-8)

1. **Publish Final Version of Old Package**
   ```json
   {
     "name": "old-package-name",
     "version": "2.0.0",
     "deprecated": "This package has been renamed to 'new-package-name'. Please update your dependencies.",
     "main": "./dist/index.js"
   }
   ```

2. **Create New Package**
   ```json
   {
     "name": "new-package-name",
     "version": "1.0.0",
     "description": "Continuation of old-package-name with new name",
     "main": "./dist/index.js"
   }
   ```

3. **Add Deprecation Warnings**
   ```javascript
   // In old package's index.js
   console.warn('⚠️  DEPRECATION WARNING: This package has been renamed to "new-package-name"');
   console.warn('📦 Please update: npm install new-package-name');
   console.warn('📚 Migration guide: https://github.com/user/repo/blob/main/MIGRATION.md');

   // Re-export everything from new package for compatibility
   module.exports = require('new-package-name');
   ```

#### Phase 3: User Communication (Ongoing)

1. **Update All Documentation**
   - GitHub README
   - npm description
   - Website/docs
   - Blog posts/announcements

2. **Social Media Announcement**
   ```markdown
   🚨 Package Migration Notice

   📦 old-package-name → new-package-name
   🔧 Update command: npm install new-package-name
   📚 Migration guide: [link]
   ⏰ Timeline: 8 weeks for full transition
   ```

3. **GitHub Issues Template**
   ```markdown
   ## Migration Notice
   This repository has been migrated to `new-package-name`.
   Please update your dependencies:

   ```bash
   npm uninstall old-package-name
   npm install new-package-name
   ```

   Update imports:
   ```javascript
   // Old
   import { api } from 'old-package-name';

   // New
   import { api } from 'new-package-name';
   ```
   ```

#### Phase 4: Deprecation (Week 8+)

1. **Publish Deprecated Version**
   ```bash
   npm deprecate old-package-name@"*" "Package renamed to new-package-name"
   ```

2. **Final Compatibility Version**
   ```json
   {
     "name": "old-package-name",
     "version": "2.1.0",
     "deprecated": true,
     "dependencies": {
       "new-package-name": "^1.0.0"
     }
   }
   ```

#### Phase 5: Cleanup (Month 3+)

1. **Monitor Usage Statistics**
   ```bash
   npm view old-package-name --json | jq '.downloads'
   ```

2. **Final Deprecation**
   - Stop publishing new versions to old package
   - Archive old repository
   - Redirect documentation

### Code Examples

#### Migration Helper Script

```javascript
// migration-helper.js
const fs = require('fs');
const path = require('path');

function updatePackageReferences(directory, oldName, newName) {
  const packageJsonPath = path.join(directory, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Update dependencies
    if (packageJson.dependencies && packageJson.dependencies[oldName]) {
      packageJson.dependencies[newName] = packageJson.dependencies[oldName];
      delete packageJson.dependencies[oldName];
    }

    // Update devDependencies
    if (packageJson.devDependencies && packageJson.devDependencies[oldName]) {
      packageJson.devDependencies[newName] = packageJson.devDependencies[oldName];
      delete packageJson.devDependencies[oldName];
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`✅ Updated ${packageJsonPath}`);
  }
}

// Usage
updatePackageReferences('./', 'old-package-name', 'new-package-name');
```

#### Import Update Script

```bash
#!/bin/bash
# update-imports.sh

OLD_PACKAGE="old-package-name"
NEW_PACKAGE="new-package-name"

# Find and replace imports in TypeScript/JavaScript files
find . -name "*.ts" -o -name "*.js" -o -name "*.tsx" -o -name "*.jsx" | \
  xargs sed -i "s/from ['\"]$OLD_PACKAGE/from '$NEW_PACKAGE/g"

# Find and replace require statements
find . -name "*.js" -o -name "*.ts" | \
  xargs sed -i "s/require(['\"]$OLD_PACKAGE['\"])/require('$NEW_PACKAGE')/g"

echo "✅ Import statements updated"
```

### Timeline Template

| Week | Action | Status |
|------|--------|--------|
| 1 | Announce migration, reserve new package name | 🟡 Planning |
| 2-3 | Publish new package, add deprecation warnings | 🟡 In Progress |
| 4-6 | User communication, documentation updates | 🟡 In Progress |
| 7-8 | Monitor adoption, provide support | 🟡 In Progress |
| 9-12 | Deprecate old package, cleanup | 🟢 Complete |

### Best Practices

1. **Communication First**
   - Give users plenty of notice (minimum 4-8 weeks)
   - Use multiple channels (GitHub, npm, social media)
   - Provide clear migration instructions

2. **Maintain Compatibility**
   - Keep old package functional during transition
   - Provide automated migration tools where possible
   - Maintain same API in new package

3. **Monitor Progress**
   - Track download statistics
   - Monitor GitHub issues/discussions
   - Respond to user questions quickly

4. **Documentation**
   - Keep migration guide updated
   - Document breaking changes clearly
   - Provide code examples for common use cases

### Risks and Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Users don't migrate | High | Extended support period, clear communication |
| Broken builds | High | Maintain compatibility layer, provide migration tools |
| SEO/Discovery loss | Medium | Redirect documentation, update search terms |
| Community fragmentation | Medium | Clear messaging, unified documentation |

## Conclusion

Migration Option 2 is comprehensive but necessary when you have existing users. The key is communication, timing, and maintaining compatibility throughout the transition period.

For new packages or packages without published versions, prefer **Option 1: Simple Rename** as documented in the main project.