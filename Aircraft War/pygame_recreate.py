import pygame
import random
from os import path

log = print


class Player(pygame.sprite.Sprite):
    # init sprite
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)
        # rect 50-50
        self.image = pygame.transform.scale(player_img, (58, 50))
        self.image.set_colorkey((0, 0, 0))
        # Get the positions of the sprite
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH / 2
        self.rect.bottom = HEIGHT

    def update(self):
        key_state = pygame.key.get_pressed()
        velocity = 5
        # Button
        if key_state[pygame.K_LEFT]:
            self.rect.x -= velocity
        if key_state[pygame.K_RIGHT]:
            self.rect.x += velocity
        # Boundary judgment
        if self.rect.left > WIDTH:
            self.rect.right = 0
        if self.rect.right < 0:
            self.rect.left = WIDTH

    def shoot(self):
        bullet = Bullet(self.rect.centerx, self.rect.centery)
        bullets.add(bullet)


class Enemy(pygame.sprite.Sprite):
     def __init__(self):
         pygame.sprite.Sprite.__init__(self)
         self.image = pygame.transform.scale(enemy_img, (58, 50))
         self.image.set_colorkey((0, 0, 0))
         # Get the positions of the sprite --> tuple
         self.rect = self.image.get_rect()
         self.rect.y = 0
         self.rect.x = random.randint(0, WIDTH - self.rect.w)

         self.velocity_x = random.randint(-2, 2)
         self.velocity_y = random.randint(2, 4)

     def update(self):
        self.rect.x += self.velocity_x
        self.rect.y += self.velocity_y

     def double_protect(self):
        pass


class Bullet(pygame.sprite.Sprite):
    def __init__(self, x, y):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.transform.scale(player_img, (8, 18))
        self.image.set_colorkey((0, 0, 0))
        # Get the positions of the sprite --> tuple
        self.rect = self.image.get_rect()
        self.rect.centerx = x
        self.rect.centery = y

    def update(self):
        velocity = 5
        self.rect.y -= velocity


class Explosion(pygame.sprite.Sprite):
    def __init__(self, center):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.transform.scale(explosion_img, (80, 80))
        self.image.set_colorkey((0, 0, 0))
        self.rect = self.image.get_rect()
        self.rect.center = center
        self.frame = 0
        self.last_time = pygame.time.get_ticks()

    def update(self):
        now = pygame.time.get_ticks()
        if now - self.last_time > 30:
            if self.frame < len(explosion_animation):
                self.image = pygame.transform.scale(explosion_animation[self.frame], (80, 80))
                self.image.set_colorkey((0, 0, 0))
                self.frame += 1
                self.last_time = now
            else:
                self.kill()


pygame.init()
WIDTH, HEIGHT = 480, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Aircraft War')
clock = pygame.time.Clock()


def img_load(abs_path, img_path):
    img_name = path.join(abs_path, img_path)
    img_done = pygame.image.load(img_name).convert()
    return img_done


# img
img_dir_path = path.join(path.dirname(__file__), 'img')
background_img = img_load(img_dir_path, 'background.png')
background_rect = background_img.get_rect()
player_img = img_load(img_dir_path, 'Sprites/Ships/spaceShips_005.png')
enemy_img = img_load(img_dir_path, 'Sprites/Ships/spaceShips_002.png')
bullet_img = img_load(img_dir_path, 'Sprites/Missiles/spaceMissiles_022.png')


explosion_animation = []
for i in range(2, 23):
    explosion_dir = path.join(img_dir_path, f'Explosion/Bow-{i} (dragged).png')
    explosion_img = pygame.image.load(explosion_dir).convert()
    explosion_animation.append(explosion_img)
player = Player()
enemies = pygame.sprite.Group()
for i in range(10):
    enemy = Enemy()
    enemies.add(enemy)
bullets = pygame.sprite.Group()
explosions = pygame.sprite.Group()

game_over = False
while not game_over:
    # FPS:60 1000ms/60
    clock.tick(60)

    # Detect User Input
    event_list = pygame.event.get()
    for event in event_list:
        if event.type == pygame.QUIT:
            game_over = True
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                game_over = True
                log("Thank you for playing.")
            if event.key == pygame.K_SPACE:
                player.shoot()
        # mouse event
        if event.type == pygame.MOUSEMOTION:
            mouse_pos = event.pos
            log(mouse_pos)

    screen.fill((255, 255, 255))

    player.update()
    enemies.update()
    bullets.update()
    explosions.update()

    # False 表示碰到不删除
    hits_player_enemy = pygame.sprite.spritecollide(player, enemies, False, pygame.sprite.collide_rect_ratio(0.7))
    if hits_player_enemy:
        game_over = True

    hit_enemy_bullet = pygame.sprite.groupcollide(enemies, bullets, True, True)
    for hit in hit_enemy_bullet:
        explosion = Explosion(hit.rect.center)
        explosions.add(explosion)
        enemy = Enemy()
        enemies.add(enemy)

    # draw
    screen.blit(background_img, background_rect)
    screen.blit(player.image, (player.rect.x, player.rect.y))
    enemies.draw(screen)
    bullets.draw(screen)
    explosions.draw(screen)

    # 单层变双层
    pygame.display.flip()
