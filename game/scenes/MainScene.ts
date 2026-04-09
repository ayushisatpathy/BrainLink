import * as Phaser from 'phaser';
import { getSocket } from '@/lib/socket';

export class MainScene extends Phaser.Scene {
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null = null;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private otherPlayers: Phaser.GameObjects.Group | null = null;
  private otherPlayersMap: Map<string, any> = new Map();
  private staticObstacles: Phaser.Physics.Arcade.StaticGroup | null = null;
  private socket = getSocket();
  private rooms: Phaser.GameObjects.Rectangle[] = [];
  private currentRoom: string | null = null;
  private groupSlotCounters: { [key: string]: number } = {};
  private localClones: Map<string, Phaser.GameObjects.Sprite> = new Map();
  private roomOccupancyLabels: Map<string, Phaser.GameObjects.Text> = new Map();
  private roomOccupancyCounts: Map<string, number> = new Map();
  private heatmapGraphics: Phaser.GameObjects.Graphics | null = null;
  private teleportHandler: ((event: any) => void) | null = null;
  private groupsUpdatedHandler: ((event: any) => void) | null = null;

  private getSeatingPosition(groupTag: string, index: number) {
    const areas: { [key: string]: any } = {
      "React Enthusiasts": { x: 150, y: 150, w: 300, h: 250 }, // Coding Lab
      "Data Miners": { x: 1350, y: 150, w: 300, h: 250 },    // Mock Interview
      "Algorithm Aces": { x: 150, y: 1000, w: 300, h: 250 },  // Project Studio
      "Silent": { x: 1350, y: 1000, w: 300, h: 250 },        // Mentor Lounge
      "General": { x: 750, y: 600, w: 300, h: 200 },       // Library
      "Hackathon Hub": { x: 750, y: 150, w: 300, h: 250 },
      "Doubt Room": { x: 150, y: 575, w: 300, h: 250 },
      "Placement Center": { x: 1350, y: 575, w: 300, h: 250 },
      "Live Arena": { x: 750, y: 1000, w: 300, h: 250 }
    };

    const area = areas[groupTag] || areas["General"];
    const col = index % 3;
    const row = Math.floor(index / 3);
    
    return {
      x: area.x + 45 + (col * 55),
      y: area.y + 60 + (row * 50)
    };
  }

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image('tiles', 'https://labs.phaser.io/assets/tilemaps/tiles/drawtiles.png');
    this.load.image('tree', 'https://labs.phaser.io/assets/sprites/tree-oak.png');
    this.load.spritesheet('player', 'https://labs.phaser.io/assets/sprites/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    // Compact campus ground (1800x1400)
    this.physics.world.setBounds(0, 0, 1800, 1400);
    this.cameras.main.setBounds(0, 0, 1800, 1400);

    const graphics = this.add.graphics();
    graphics.fillStyle(0x0f172a, 1);
    graphics.fillRect(0, 0, 1800, 1400);

    // Heatmap Layer (Initialized as semi-transparent)
    this.heatmapGraphics = this.add.graphics();
    this.heatmapGraphics.setDepth(5);
    this.heatmapGraphics.setAlpha(0.2);

    // Draw grid for scale
    graphics.lineStyle(1, 0x1e293b, 0.5);
    for (let x = 0; x <= 1800; x += 100) {
      graphics.lineBetween(x, 0, x, 1400);
    }
    for (let y = 0; y <= 1400; y += 100) {
      graphics.lineBetween(0, y, 1800, y);
    }

    // Courtyard Centerpiece (Scaled for 1800x1400)
    graphics.lineStyle(4, 0x1e293b, 1);
    graphics.strokeCircle(900, 700, 200);
    graphics.fillStyle(0x1e293b, 0.5);
    graphics.fillCircle(900, 700, 200);

    // 9 Specialized Buildings distributed in a grid
    // 9 Specialized Buildings in compact layout
    // Row 1 (Top)
    this.createArea(150, 150, 300, 250, 0x38bdf8, "Coding Lab", "React Enthusiasts");
    this.createArea(750, 150, 300, 250, 0xa855f7, "Hackathon Hub", "Hackathon Hub");
    this.createArea(1350, 150, 300, 250, 0x818cf8, "Interview Room", "Data Miners");

    // Row 2 (Middle)
    this.createArea(150, 575, 300, 250, 0xf43f5e, "Doubt Room", "Doubt Room");
    this.createArea(750, 600, 300, 200, 0x10b981, "Main Library", "General");
    this.createArea(1350, 575, 300, 250, 0xfacc15, "Placement Center", "Placement Center");

    // Row 3 (Bottom)
    this.createArea(150, 1000, 300, 250, 0xf472b6, "Project Studio", "Algorithm Aces");
    this.createArea(750, 1000, 300, 250, 0x22d3ee, "Live Arena", "Live Arena");
    this.createArea(1350, 1000, 300, 250, 0xf59e0b, "Mentor Lounge", "Silent");

    // Other players (Not a physics group to save overhead)
    this.otherPlayers = this.add.group();
    
    // Static obstructions (Single group for all obstacles)
    this.staticObstacles = this.physics.add.staticGroup();

    // Environmental Decorations
    this.addTrees();
    this.addBenches();

    // Player setup (Static, seated based on joined groups or General/Library)
    let initialGroup = "General";
    if (typeof window !== 'undefined') {
      const savedGroups = localStorage.getItem('brainlink_joined_groups');
      if (savedGroups) {
        const parsed = JSON.parse(savedGroups);
        if (parsed.length > 0) initialGroup = parsed[0];
      }
    }
    
    const myPos = this.getSeatingPosition(initialGroup, 0);
    this.groupSlotCounters[initialGroup] = (this.groupSlotCounters[initialGroup] || 0) + 1;

    this.player = this.physics.add.sprite(myPos.x, myPos.y, 'player');
    this.player.setCollideWorldBounds(true);
    // Player is no longer immovable - restore movement
    this.addLabel(this.player, "You", initialGroup);
    
    // Single collision rule for all obstacles
    this.physics.add.collider(this.player, this.staticObstacles);
    
    // Strategic camera zoom for unified view
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(0.6);

    // Keyboard inputs
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Camera Panning Logic (Hold and drag to pan)
    this.input.on('pointerdown', () => {
      this.cameras.main.stopFollow();
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!pointer.isDown) return;
      
      const dragFactor = 1 / this.cameras.main.zoom;
      this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) * dragFactor;
      this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) * dragFactor;
    });

    // Right-click to re-center on player quickly
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.rightButtonDown()) {
        if (this.player) {
          this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        }
      }
    });

    // Press 'C' to re-center on player
    this.input.keyboard!.on('keydown-C', () => {
      if (this.player) {
         this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
      }
    });

    // Animations
    this.createAnimations();

    // Socket listeners
    const initialGroupsList = initialGroup === "General" ? ["General"] : [initialGroup];
    this.socket.emit('newPlayer', { x: this.player.x, y: this.player.y, username: "You", groups: initialGroupsList });

    // Local event listener for sidebar group changes
    this.groupsUpdatedHandler = (event: any) => {
      if (!this.scene.isActive()) return;
      const newGroups = event.detail;
      this.updateLocalPresence(newGroups);
    };
    window.addEventListener('groups-updated', this.groupsUpdatedHandler);

    // Teleport Listener (for clicking mini-map or sidebar list)
    this.teleportHandler = (event: any) => {
      const group = event.detail;
      if (!this.player) return;

      const pos = this.getSeatingPosition(group, 0);
      this.player.setPosition(pos.x, pos.y);
      this.updatePlayerLabel(this.player, { username: "You", groups: [group] });
      
      // Stop any existing movement
      this.player.setVelocity(0);
      
      // Visual feedback (Teleport effect)
      this.player.setAlpha(0.2);
      this.tweens.add({
        targets: this.player,
        alpha: 1,
        duration: 200,
        ease: 'Power2'
      });
      
      // Sync with server
      this.socket.emit('playerMovement', { x: pos.x, y: pos.y });

      // Re-center camera
      this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

      // Update Mini-Map Dot
      this.updateHeatmap();

      // Ensure room entry is detected after teleport with a slight delay for transform sync
      this.time.delayedCall(50, () => this.checkRoomEntry());
    };
    window.addEventListener('teleport-to-room', this.teleportHandler);

    this.socket.on('currentPlayers', (players: any) => {
      if (!this.scene.isActive()) return;
      Object.keys(players).forEach((id) => {
        if (id !== this.socket.id) {
          this.addOtherPlayer(players[id]);
        }
      });
    });

    this.socket.on('playerJoined', (playerData: any) => {
      if (!this.scene.isActive()) return;
      this.addOtherPlayer(playerData);
    });

    this.socket.on('playerUpdated', (playerData: any) => {
      if (!this.scene.isActive()) return;
      
      // Handle Local Player Relocation
      if (playerData.id === this.socket.id && this.player) {
        const group = (playerData.groups && playerData.groups.length > 0) ? playerData.groups[0] : "General";
        const pos = this.getSeatingPosition(group, 0); // Local player usually takes seat 0 in their group
        
        this.player.setPosition(pos.x, pos.y);
        if ((this.player as any).label) {
          (this.player as any).label.setPosition(pos.x, pos.y - 40);
          (this.player as any).label.setText(`${playerData.username}\n[${group}]`);
        }
        
        // Sync new stationary position with others
        this.socket.emit('playerMovement', { x: pos.x, y: pos.y });
        return;
      }

      // Handle Other Players
      const otherPlayer = this.otherPlayersMap?.get(playerData.id);
      if (otherPlayer && otherPlayer.active) {
        this.updatePlayerLabel(otherPlayer, playerData);
      }
    });

    // Movement strictly disabled for all participants - Everyone remains static in their assigned spots

    this.socket.on('playerDisconnected', (playerId: string) => {
      const otherPlayer = this.otherPlayersMap?.get(playerId);
      if (otherPlayer && otherPlayer.active) {
        if (otherPlayer.label && otherPlayer.label.active) otherPlayer.label.destroy();
        if (otherPlayer.proximityIndicator) otherPlayer.proximityIndicator.destroy();
        otherPlayer.destroy();
        this.otherPlayersMap.delete(playerId);
      }
    });

    this.socket.on('playerMoved', (playerData: any) => {
      if (!this.scene.isActive()) return;
      const otherPlayer = this.otherPlayersMap?.get(playerData.id);
      if (otherPlayer && otherPlayer.active) {
        otherPlayer.setPosition(playerData.x, playerData.y);
        if (otherPlayer.label && otherPlayer.label.active) {
          otherPlayer.label.setPosition(playerData.x, playerData.y - 40);
        }
        if (otherPlayer.proximityIndicator) {
          otherPlayer.proximityIndicator.setPosition(playerData.x, playerData.y - 70);
        }
      }
    });

    // Populated with NPCs
    this.spawnNPCs();

    // Scene shutdown listener
    this.events.on('shutdown', this.shutdown, this);
    this.events.on('destroy', this.shutdown, this);

    // Initial check for room entry
    this.time.delayedCall(500, () => this.checkRoomEntry());
  }

  private updateLocalPresence(groups: string[]) {
    if (!this.player || !this.add || !this.scene.isActive()) return;

    // Clean up existing clones
    this.localClones.forEach(clone => {
      if ((clone as any).label && (clone as any).label.active) (clone as any).label.destroy();
      clone.destroy();
    });
    this.localClones.clear();

    if (groups.length === 0) {
      // Return to Library
      const pos = this.getSeatingPosition("General", 0);
      this.player.setPosition(pos.x, pos.y);
      this.updatePlayerLabel(this.player, { username: "You", groups: ["General"] });
      this.socket.emit('playerMovement', { x: pos.x, y: pos.y });
    } else {
      // Position primary player in the first group
      const firstGroup = groups[0];
      const primaryPos = this.getSeatingPosition(firstGroup, 0);
      this.player.setPosition(primaryPos.x, primaryPos.y);
      this.updatePlayerLabel(this.player, { username: "You", groups: [firstGroup] });
      this.socket.emit('playerMovement', { x: primaryPos.x, y: primaryPos.y });

      // Create clones for additional groups
      for (let i = 1; i < groups.length; i++) {
        const group = groups[i];
        const pos = this.getSeatingPosition(group, 0);
        const clone = this.add.sprite(pos.x, pos.y, 'player');
        clone.setAlpha(0.7); // Subtle distinction for clones
        this.addLabel(clone, "You", group);
        this.localClones.set(group, clone);
      }
    }
  }

  private shutdown() {
    const phys = this.physics;
    if (phys && phys.world) {
      phys.pause();
      phys.world.colliders?.destroy();
    }

    this.socket.off('currentPlayers');
    this.socket.off('playerJoined');
    this.socket.off('playerUpdated');
    this.socket.off('playerMoved');
    this.socket.off('playerDisconnected');

    if (this.teleportHandler) {
      window.removeEventListener('teleport-to-room', this.teleportHandler);
    }
    if (this.groupsUpdatedHandler) {
      window.removeEventListener('groups-updated', this.groupsUpdatedHandler);
    }
    
    // Clear local clones
    this.localClones.forEach(clone => {
      if ((clone as any).label && (clone as any).label.active) (clone as any).label.destroy();
      clone.destroy();
    });
    this.localClones.clear();

    // Clear the map and explicitly destroy everything to be safe
    this.otherPlayersMap.forEach((player) => {
      if (player.label && player.label.active) player.label.destroy();
      if (player.proximityIndicator) player.proximityIndicator.destroy();
      if (player.active) player.destroy();
    });
    this.otherPlayersMap.clear();
  }

  private addTrees() {
    // Scaffold trees across the map
    const treePositions = [];
    for (let x = 100; x < 1800; x += 400) {
      for (let y = 100; y < 1400; y += 400) {
        if (Math.abs(x - 900) < 300 && Math.abs(y - 700) < 300) continue; // Skip courtyard
        treePositions.push({ x, y });
      }
    }
    
    treePositions.forEach(pos => {
      const tree = this.add.circle(pos.x, pos.y, 20, 0x10b981, 0.4);
      this.staticObstacles?.add(tree);
      this.add.circle(pos.x, pos.y, 14, 0x059669, 0.6);
      this.add.rectangle(pos.x, pos.y + 20, 6, 12, 0x78350f);
    });
  }

  private addBenches() {
    const benchPositions = [
      {x: 370, y: 200, w: 60, h: 15}, {x: 370, y: 385, w: 60, h: 15}
    ];

    benchPositions.forEach(pos => {
      const bench = this.add.rectangle(pos.x + pos.w/2, pos.y + pos.h/2, pos.w, pos.h, 0x334155);
      this.staticObstacles?.add(bench);
    });
  }

  private spawnNPCs() {
    const npcNames = ["Bot Arjun", "Bot Priya", "Bot Rahul", "Bot Sneha", "Bot Vivek", "Bot Diya"];
    const groups = ["React Enthusiasts", "Data Miners", "Algorithm Aces", "Silent", "General", "React Enthusiasts"];
    
    for (let i = 0; i < 6; i++) {
        const group = groups[i % groups.length];
        const slot = this.groupSlotCounters[group] || 0;
        const pos = this.getSeatingPosition(group, slot);
        this.groupSlotCounters[group] = slot + 1;
        
        const name = npcNames[i % npcNames.length] + " (NPC)";
        const npc = this.physics.add.sprite(pos.x, pos.y, 'player');
        npc.setTint(0x64748b);
        npc.setImmovable(true);
        this.addLabel(npc, name, group);
    }
  }

  private addLabel(obj: any, name: string, group: string) {
    if (!this.add || !this.scene.isActive()) return;

    const label = this.add.text(obj.x, obj.y - 40, `${name}\n[${group}]`, {
      fontSize: '12px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 4, y: 2 },
      align: 'center'
    }).setOrigin(0.5);
    obj.label = label;
  }

  private updatePlayerLabel(otherPlayer: any, playerData: any) {
    const group = (playerData.groups && playerData.groups.length > 0) ? playerData.groups[0] : "General";
    if (otherPlayer.label && otherPlayer.label.active) {
      otherPlayer.label.setText(`${playerData.username}\n[${group}]`);
    } else {
      this.addLabel(otherPlayer, playerData.username, group);
    }
  }

  private createAnimations() {
// ...
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update() {
    if (!this.player || !this.cursors) return;

    const speed = 200;
    const prevPos = { x: this.player.x, y: this.player.y };

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.player.anims.play('turn');
      }
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.player.anims.play('turn');
      }
    } else {
      this.player.setVelocityY(0);
    }

    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
      this.player.anims.play('turn');
    }

    // Update label position
    if ((this.player as any).label) {
      (this.player as any).label.setPosition(this.player.x, this.player.y - 40);
    }

    // Emit movement
    if (this.player && (prevPos.x !== this.player.x || prevPos.y !== this.player.y)) {
      this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y });
      this.checkRoomEntry();
      this.checkProximity();
      this.updateHeatmap();
    }
  }

  private checkProximity() {
    if (!this.player) return;

    this.otherPlayersMap.forEach((otherPlayer, id) => {
      if (!otherPlayer.active) return;
      
      const distance = Phaser.Math.Distance.Between(this.player!.x, this.player!.y, otherPlayer.x, otherPlayer.y);
      
      if (distance < 100) {
        if (!otherPlayer.proximityIndicator) {
          const indicator = this.add.text(otherPlayer.x, otherPlayer.y - 70, "💬 PRESS 'E' TO INTERACT", {
            fontSize: '10px',
            color: '#38bdf8',
            backgroundColor: '#000000bb',
            padding: { x: 4, y: 2 }
          }).setOrigin(0.5);
          otherPlayer.proximityIndicator = indicator;
        } else {
          otherPlayer.proximityIndicator.setPosition(otherPlayer.x, otherPlayer.y - 70);
        }
      } else {
        if (otherPlayer.proximityIndicator) {
          otherPlayer.proximityIndicator.destroy();
          otherPlayer.proximityIndicator = null;
        }
      }
    });
  }

  private updateHeatmap() {
    if (!this.heatmapGraphics) return;
    this.heatmapGraphics.clear();
    
    this.otherPlayersMap.forEach(player => {
      if (player.active) {
        this.heatmapGraphics!.fillStyle(0x38bdf8, 0.3);
        this.heatmapGraphics!.fillCircle(player.x, player.y, 40);
      }
    });

    if (this.player) {
      this.heatmapGraphics!.fillStyle(0xf43f5e, 0.3);
      this.heatmapGraphics!.fillCircle(this.player.x, this.player.y, 40);

      // Dispatch normalized position for Mini-Map (1800x1400)
      window.dispatchEvent(new CustomEvent('player-location-update', {
        detail: {
          x: this.player.x / 1800,
          y: this.player.y / 1400
        }
      }));
    }
  }

  private updateOccupancyDisplay(roomName: string, count: number) {
    const label = this.roomOccupancyLabels.get(roomName);
    if (label) {
      label.setText(`${count} students active`);
    }
  }

  private checkRoomEntry() {
    if (!this.player) return;

    let foundRoomName = null;
    const px = this.player.x;
    const py = this.player.y;

    for (const room of this.rooms) {
      const roomName = (room as any).roomName;
      const bounds = room.getBounds();
      if (bounds.contains(px, py)) {
        foundRoomName = roomName;
        break;
      }
    }

    if (foundRoomName) {
      if (this.currentRoom !== foundRoomName) {
        this.currentRoom = foundRoomName;
        window.dispatchEvent(new CustomEvent('enterRoom', { detail: this.currentRoom }));
        this.socket.emit('playerEnterRoom', { room: this.currentRoom });
      }
    } else if (this.currentRoom) {
      const oldRoom = this.currentRoom;
      this.currentRoom = null;
      window.dispatchEvent(new CustomEvent('exitRoom', { detail: oldRoom }));
      this.socket.emit('playerExitRoom', { room: oldRoom });
    }
  }

  private createArea(x: number, y: number, width: number, height: number, color: number, name: string, groupTag: string) {
    const area = this.add.rectangle(x + width / 2, y + height / 2, width, height, color, 0.1);
    area.setStrokeStyle(2, color, 0.8);
    (area as any).roomName = name;
    (area as any).groupTag = groupTag;
    this.rooms.push(area);
    
    // Glowing corner effect
    const glow = this.add.graphics();
    glow.lineStyle(4, color, 0.3);
    glow.strokeRoundedRect(x, y, width, height, 8);

    this.add.text(x + 15, y + 15, name.toUpperCase(), {
      fontSize: '14px',
      color: '#ffffff',
      fontStyle: '900',
      letterSpacing: 1
    });

    this.add.text(x + 15, y + 35, groupTag, {
      fontSize: '9px',
      color: '#94a3b8',
      fontStyle: 'bold uppercase'
    });

    const occupancy = this.add.text(x + 15, y + 55, "0 students active", {
      fontSize: '10px',
      color: '#10b981',
      fontStyle: 'bold'
    });
    this.roomOccupancyLabels.set(name, occupancy);

    // Clickable Manual Trigger
    const btn = this.add.text(x + width - 70, y + height - 35, "OPEN HUB", {
      fontSize: '10px',
      color: '#ffffff',
      backgroundColor: color === 0x38bdf8 ? '#0369a1' : '#1e293b',
      padding: { x: 8, y: 4 },
      fontStyle: '900'
    })
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      window.dispatchEvent(new CustomEvent('enterRoom', { detail: name }));
    });
  }

  private addOtherPlayer(playerData: any) {
    const group = (playerData.groups && playerData.groups.length > 0) ? playerData.groups[0] : "General";
    const slot = this.groupSlotCounters[group] || 0;
    const pos = this.getSeatingPosition(group, slot);
    this.groupSlotCounters[group] = slot + 1;

    const otherPlayer = this.physics.add.sprite(pos.x, pos.y, 'player');
    otherPlayer.setTint(0x94a3b8);
    otherPlayer.setImmovable(true);
    (otherPlayer as any).playerId = playerData.id;
    this.otherPlayers?.add(otherPlayer);
    this.otherPlayersMap.set(playerData.id, otherPlayer);
    this.updatePlayerLabel(otherPlayer, playerData);
  }
}
