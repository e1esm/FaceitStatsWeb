export class User {
    constructor({ nickname, country, avatar, player_id, games }) {
      this.nickname = nickname;
      this.country = country;
      this.avatar = avatar;
      this.playerId = player_id;
      this.games = games;
  
      const cs2Game = games.find((game) => game.name === 'cs2');
      this.cs2SkillLevel = cs2Game ? cs2Game.skill_level : 'Not available';
    }
  }

export class PlatformUser{
    constructor(data){
        this.id = data.id;
        this.username = data.username;
        this.role = data.role;
        this.faceitLink = data.faceit_link;
    }


    toJson(newPassword, oldPassword){
        return {
            new_password: newPassword,
            old_password: oldPassword,
            username: this.username,
            faceit_link: this.faceitLink,
            role: this.role
        };
    }
}
